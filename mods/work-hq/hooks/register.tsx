import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Agenda, CalEvent, Hq, HqDated, HqProject, HqTask } from '../types'

// Work HQ : le panneau du hub work-assistant.
// Une seule source : projects/_hq.json, régénéré par `python -I _tools/xref.py` (étape /wrap).
// Le mod ne lit aucune fiche du repo.

const PANE = 'work-hq'
const TITLE = 'Work HQ'
const HQ_FILE = 'projects/_hq.json'
const TZ = 'Europe/Zurich'
const STALE_DAYS = 7
const CALENDAR_SERVERS = ['Google Calendar', 'claude.ai Google Calendar', 'Google_Calendar']

// Changer le tag quand la forme d'une valeur change : l'ancienne valeur, qui survit au rechargement, est ignorée.
const hqAtom = atom({ plugin: 'work-hq', key: 'hq' } as const, null, { shape: 'hq-1' })
const agendaAtom = atom({ plugin: 'work-hq', key: 'agenda' } as const, { status: 'loading' }, { shape: 'agenda-1' })
const expandedAtom = atom({ plugin: 'work-hq', key: 'expanded' } as const, [], { shape: 'expanded-1' })

// ---------- dates (fuseau de Thomas) ----------

const WEEKDAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']

export function today(now: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
  } catch {
    return now.toISOString().slice(0, 10)
  }
}

function utc(day: string): number {
  const [y, m, d] = day.split('-').map(Number)
  return Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1)
}

export function daysBetween(from: string, to: string): number {
  return Math.round((utc(to) - utc(from)) / 86_400_000)
}

function nextDay(day: string): string {
  return new Date(utc(day) + 86_400_000).toISOString().slice(0, 10)
}

function dayLabel(day: string): string {
  const d = new Date(utc(day))
  return `${WEEKDAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`
}

function ago(days: number): string {
  return days <= 0 ? "aujourd'hui" : days === 1 ? 'hier' : `il y a ${days} j`
}

// ---------- ce que le panneau montre (fonctions pures, testées) ----------

export type Reminder = { key: string; label: string; origin: string; late: number }

/** Les rappels : tout ce qui est daté et échu, plus les tâches Admin sans date. Restent jusqu'à être cochés. */
export function reminders(hq: Hq, day: string): Reminder[] {
  const prefixOf = (slug: string | null) => hq.projects.find(p => p.slug === slug)?.prefix ?? ''
  const due: Reminder[] = hq.dated
    .filter((d: HqDated) => d.due <= day)
    .map(d => ({
      key: `${d.kind}:${d.id}`,
      label: d.text,
      origin: d.kind === 'contact' ? 'contact' : `${prefixOf(d.project)} ${d.id}`.trim(),
      late: daysBetween(d.due, day),
    }))
  const admin = hq.projects.find(p => p.slug === 'admin')
  const undated: Reminder[] = (admin?.tasks ?? [])
    .filter(t => t.due === null)
    .map(t => ({ key: `task:${t.id}`, label: t.text, origin: t.id, late: 0 }))
  return [...due, ...undated].sort((a, b) => b.late - a.late)
}

export type Card = {
  project: HqProject
  idle: number | null
  doing: HqTask[]
  open: HqTask[]
  small: HqTask[]
}

/** Les projets actifs en cartes, les autres (pause, terminé) à replier. Admin n'est pas un projet affiché. */
export function cards(hq: Hq, day: string): { active: Card[]; folded: Card[] } {
  const all = hq.projects
    .filter(p => p.slug !== 'admin')
    .map(p => ({
      project: p,
      idle: p.lastActivity ? daysBetween(p.lastActivity, day) : null,
      doing: p.tasks.filter(t => t.size === 'main' && t.state === 'doing'),
      open: p.tasks.filter(t => t.size === 'main' && t.state === 'open'),
      small: p.tasks.filter(t => t.size === 'small'),
    }))
  const isActive = (c: Card) => c.project.status !== 'paused' && c.project.status !== 'done'
  const order = (a: Card, b: Card) => (a.idle ?? 999) - (b.idle ?? 999)
  return { active: all.filter(isActive).sort(order), folded: all.filter(c => !isActive(c)) }
}

/** Le dashboard en texte, pour le téléphone : l'app mobile n'affiche pas les panneaux, seulement la réponse d'une commande. */
export function summary(hq: Hq, agenda: Agenda, day: string, showSmall: boolean): string {
  const out: string[] = [`WORK HQ · ${dayLabel(day)}`, '']
  const line = (t: HqTask) => `  ${t.state === 'doing' ? '▶' : '·'} ${t.id} ${t.text}${t.due !== null ? ` ⏰${t.due.slice(5)}` : ''}`

  out.push("AUJOURD'HUI")
  if (agenda.status === 'loading') out.push("  agenda en cours de chargement, relance /hq dans un instant")
  if (agenda.status === 'error') out.push(`  agenda indisponible : ${agenda.message}`)
  if (agenda.status === 'ok') {
    if (agenda.events.length === 0) out.push('  Rien de planifié.')
    for (const ev of agenda.events) out.push(`  ${ev.time}  ${ev.title}`)
    if (agenda.calendar === 'principal') out.push('  (calendrier principal, « Travail » pas encore créé)')
  }

  const due = reminders(hq, day)
  out.push('', due.length > 0 ? `RAPPELS (${due.length})` : 'RAPPELS')
  if (due.length === 0) out.push('  Aucun rappel.')
  for (const r of due) out.push(`  ${r.late > STALE_DAYS ? '!! ' : ''}${r.label} · ${r.origin} · ${r.late > 0 ? `depuis ${r.late} j` : "aujourd'hui"}`)

  const { active, folded } = cards(hq, day)
  out.push('', 'PROJETS')
  for (const c of active) {
    const p = c.project
    const bits = [p.title, p.status]
    if (p.milestones.total > 0) bits.push(`jalons ${p.milestones.done}/${p.milestones.total}`)
    if (c.idle !== null) bits.push(`${c.idle > STALE_DAYS ? '!! ' : ''}${ago(c.idle)}`)
    out.push('', `${bits.join(' · ')}`)
    for (const t of [...c.doing, ...c.open]) out.push(line(t))
    if (c.doing.length + c.open.length === 0) out.push('  aucune tâche principale ouverte')
    if (c.small.length > 0) {
      if (showSmall) {
        out.push(`  petites tâches :`)
        for (const t of c.small) out.push(`  ${line(t)}`)
      } else {
        out.push(`  + ${c.small.length} petite${c.small.length > 1 ? 's' : ''} tâche${c.small.length > 1 ? 's' : ''} (/hq tout)`)
      }
    }
  }
  if (folded.length > 0) {
    out.push('', `En pause : ${folded.map(c => `${c.project.title}${c.project.milestones.total > 0 ? ` (${c.project.milestones.done}/${c.project.milestones.total})` : ''}`).join(', ')}`)
  }
  out.push('', '/wrap · /new-build · « routine du matin »')
  return out.join('\n')
}

// ---------- chargement ----------

async function loadHq($: EngineInterface, root: string): Promise<void> {
  try {
    const parsed = JSON.parse(await $.fs.read(`${root}/${HQ_FILE}`)) as Hq
    if (parsed.version === 1) await update($, hqAtom, () => parsed)
  } catch (err) {
    $.ui.status(`Work HQ : ${HQ_FILE} illisible (${String(err)})`)
  }
}

function textOf(result: { content: readonly { type: string; text?: string }[] }): string {
  return result.content.map(c => (c.type === 'text' ? c.text ?? '' : '')).join('')
}

type GEvent = { summary?: string; start?: { dateTime?: string; date?: string } }

export function toEvents(items: GEvent[]): CalEvent[] {
  return items.map(i => ({
    time: i.start?.dateTime ? i.start.dateTime.slice(11, 16) : 'journée',
    title: i.summary ?? '(sans titre)',
  }))
}

async function calendarCall($: EngineInterface, tool: string, args: Record<string, unknown>): Promise<unknown> {
  let last: unknown
  for (const server of CALENDAR_SERVERS) {
    try {
      const res = await $.mcp.call(server, tool, args)
      if (res.isError) throw new Error(textOf(res))
      return JSON.parse(textOf(res))
    } catch (err) {
      last = err
    }
  }
  throw last
}

async function loadAgenda($: EngineInterface): Promise<void> {
  const day = today()
  try {
    const list = (await calendarCall($, 'list_calendars', {})) as { calendars?: { id: string; summary?: string }[] }
    const work = list.calendars?.find(c => (c.summary ?? '').trim().toLowerCase() === 'travail')
    const events = (await calendarCall($, 'list_events', {
      ...(work ? { calendarId: work.id } : {}),
      startTime: `${day}T00:00:00`,
      endTime: `${nextDay(day)}T00:00:00`,
      orderBy: 'startTime',
      pageSize: 20,
    })) as { items?: GEvent[]; events?: GEvent[] }
    const next: Agenda = {
      status: 'ok',
      day,
      calendar: work ? 'travail' : 'principal',
      events: toEvents(events.items ?? events.events ?? []),
    }
    await update($, agendaAtom, () => next)
  } catch (err) {
    const failed: Agenda = { status: 'error', message: String(err).slice(0, 160) }
    await update($, agendaAtom, () => failed)
  }
}

// ---------- module ----------

// Le dossier du hub, connu au session.start ; absent hors de work-assistant (le mod ne fait alors rien).
const hub: { root: string | undefined; seen: number } = { root: undefined, seen: 0 }

async function refresh($: EngineInterface): Promise<void> {
  if (hub.root === undefined) return
  const stat = await $.fs.stat(`${hub.root}/${HQ_FILE}`).catch(() => undefined)
  if (stat && stat.mtimeMs !== hub.seen) {
    hub.seen = stat.mtimeMs
    await loadHq($, hub.root)
  }
}

export const register: Register = on => {

  on('session.start', async ($, e, next) => {
    const isHub = (await $.fs.exists(`${e.cwd}/${HQ_FILE}`)) && (await $.fs.exists(`${e.cwd}/_tools/xref.py`))
    if (!isHub) return next(e)
    hub.root = e.cwd
    hub.seen = 0

    await $.command.register({ name: 'hq', description: 'Work HQ en texte (et le panneau sur desktop) ; /hq tout montre les petites tâches', argumentHint: '[tout]' })
    await refresh($)
    void loadAgenda($)
    void $.ui.open({ id: PANE, title: TITLE })

    $.clock.every(20_000, () => void refresh($))
    $.clock.every(15 * 60_000, () => void loadAgenda($))
    return next(e)
  })

  // Le fichier est régénéré pendant la session (/wrap) : relire à la fin de chaque tour.
  on('turn.complete', async ($, e, next) => {
    await refresh($)
    return next(e)
  })

  on('command.run', { command: 'hq' }, async ($, e) => {
    if (hub.root === undefined) return { text: "Work HQ ne marche que dans le repo work-assistant." }
    hub.seen = 0
    await refresh($)
    await loadAgenda($)
    void $.ui.open({ id: PANE, title: TITLE })
    const hq = await read($, hqAtom)
    if (hq === null) return { text: `Pas encore de ${HQ_FILE} : lance /wrap ou python -I _tools/xref.py.` }
    const text = summary(hq, await read($, agendaAtom), today(), /\btout\b/i.test(e.args))
    return { text, isTextDisplayOnly: true }
  })

  on('session.attach', async ($, e, next) => {
    if (hub.root !== undefined) {
      void $.ui.open({ id: PANE, title: TITLE })
    }
    return next(e)
  })

  // Sur le téléphone : une ligne au-dessus du prompt, qui ouvre le panneau.
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.surface !== 'mobile' || hub.root === undefined) return next(e)
    const hq = await read($, hqAtom)
    if (hq === null) return next(e)
    const { Box, Button, Text } = $.ui.resolve(e)
    const day = today()
    const due = reminders(hq, day).length
    const doing = hq.projects.flatMap(p => p.tasks).filter(t => t.state === 'doing').length
    return (
      <Box flexDirection="row" gap={1}>
        <Button key="open-hq" onPress={() => void $.ui.open({ id: PANE, title: TITLE })}>
          Work HQ
        </Button>
        <Text color={due > 0 ? 'warning' : undefined}>
          {due === 0 ? 'aucun rappel' : due === 1 ? '1 rappel' : `${due} rappels`}
        </Text>
        <Text dimColor>· {doing} en cours</Text>
      </Box>
    )
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Button, Progress } = $.ui.resolve(e)
    const hq = await read($, hqAtom)
    const agenda = await read($, agendaAtom)
    const expanded = await read($, expandedAtom)
    const day = today()
    const isOpen = (k: string) => expanded.includes(k)
    const toggle = (k: string) => () =>
      update($, expandedAtom, list => (list.includes(k) ? list.filter(x => x !== k) : [...list, k]))

    const heading = (label: string, aside?: string) => (
      <Box flexDirection="row" gap={1} marginTop={1}>
        <Text weight="semibold" size="heading">
          {label}
        </Text>
        {aside !== undefined && <Text dimColor>{aside}</Text>}
      </Box>
    )

    if (hq === null) {
      return (
        <Box flexDirection="column">
          <Text dimColor>Pas encore de {HQ_FILE}. Lance `python -I _tools/xref.py` (ou /wrap).</Text>
        </Box>
      )
    }

    const task = (t: HqTask) => (
      <Box flexDirection="row" gap={1}>
        <Text color={t.state === 'doing' ? 'suggestion' : undefined} dimColor={t.state !== 'doing'}>
          {t.state === 'doing' ? '▶' : '·'}
        </Text>
        <Text dimColor tabular>
          {t.id}
        </Text>
        <Text wrap="wrap">{t.text}</Text>
        {t.due !== null && <Text dimColor>⏰{t.due.slice(5)}</Text>}
      </Box>
    )

    const card = (c: Card) => {
      const { project: p } = c
      const smallKey = `small:${p.slug}`
      return (
        <Box flexDirection="column" marginTop={1}>
          <Box flexDirection="row" gap={1}>
            <Text weight="semibold">{p.title}</Text>
            <Text dimColor>{p.status}</Text>
            {c.idle !== null && <Text color={c.idle > STALE_DAYS ? 'error' : 'subtle'}>{ago(c.idle)}</Text>}
          </Box>
          {p.milestones.total > 0 && (
            <Progress label="Jalons" value={p.milestones.done} max={p.milestones.total} valueText={`${p.milestones.done}/${p.milestones.total}`} />
          )}
          {c.doing.map(task)}
          {c.open.map(task)}
          {c.doing.length + c.open.length === 0 && <Text dimColor>aucune tâche principale ouverte</Text>}
          {c.small.length > 0 && (
            <Button key={smallKey} plain dimColor onPress={toggle(smallKey)}>
              {`${isOpen(smallKey) ? '▾' : '▸'} ${c.small.length} petite${c.small.length > 1 ? 's' : ''} tâche${c.small.length > 1 ? 's' : ''}`}
            </Button>
          )}
          {isOpen(smallKey) && c.small.map(task)}
        </Box>
      )
    }

    const due = reminders(hq, day)
    const { active, folded } = cards(hq, day)

    return (
      <Box flexDirection="column">
        {heading("Aujourd'hui", dayLabel(day))}
        {agenda.status === 'loading' && <Text dimColor>chargement de l'agenda…</Text>}
        {agenda.status === 'error' && <Text dimColor>agenda indisponible : {agenda.message}</Text>}
        {agenda.status === 'ok' && (
          <Box flexDirection="column">
            {agenda.events.length === 0 && <Text dimColor>Rien de planifié.</Text>}
            {agenda.events.map(ev => (
              <Box flexDirection="row" gap={1}>
                <Text tabular dimColor>
                  {ev.time}
                </Text>
                <Text wrap="wrap">{ev.title}</Text>
              </Box>
            ))}
            {agenda.calendar === 'principal' && (
              <Text dimColor size="footnote">
                calendrier principal (« Travail » pas encore créé, WA-005)
              </Text>
            )}
          </Box>
        )}

        {heading('Rappels', due.length > 0 ? String(due.length) : undefined)}
        {due.length === 0 && <Text dimColor>Aucun rappel.</Text>}
        {due.map(r => (
          <Box flexDirection="row" gap={1}>
            <Text wrap="wrap">{r.label}</Text>
            <Text dimColor>{r.origin}</Text>
            <Text color={r.late > STALE_DAYS ? 'error' : r.late > 0 ? 'warning' : 'subtle'}>
              {r.late > 0 ? `depuis ${r.late} j` : "aujourd'hui"}
            </Text>
          </Box>
        ))}

        {heading('Projets')}
        {active.map(card)}
        {folded.length > 0 && (
          <Box flexDirection="column" marginTop={1}>
            <Button key="folded" plain dimColor onPress={toggle('folded')}>
              {`${isOpen('folded') ? '▾' : '▸'} En pause (${folded.length})`}
            </Button>
            {isOpen('folded') && folded.map(card)}
          </Box>
        )}

        <Box flexDirection="row" gap={1} marginTop={1}>
          <Button key="wrap" variant="primary" onPress={() => void $.prompt.submit({ text: '/wrap' })}>
            /wrap
          </Button>
          <Button key="new-build" onPress={() => void $.prompt.submit({ text: '/new-build' })}>
            /new-build
          </Button>
          <Button key="brief" onPress={() => void $.prompt.submit({ text: 'Routine du matin : lance le brief (cycle/04_brief).' })}>
            Brief du matin
          </Button>
        </Box>
      </Box>
    )
  })
}
