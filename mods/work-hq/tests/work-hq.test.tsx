import { expect, test } from 'claude-code/testing'

import { cards, daysBetween, reminders, summary, today } from '../hooks/register'
import type { Hq } from '../types'

const DAY = today()
const back = (n: number) => new Date(Date.parse(`${DAY}T12:00:00Z`) - n * 86_400_000).toISOString().slice(0, 10)
const ahead = (n: number) => back(-n)

const HQ: Hq = {
  version: 1,
  projects: [
    {
      slug: 'admin', title: 'Admin', status: 'building', prefix: 'ADM', lastActivity: DAY,
      milestones: { done: 0, total: 0 },
      tasks: [{ id: 'ADM-001', text: 'Payer la facture Swisscom', state: 'open', size: 'main', due: null, contact: null }],
    },
    {
      slug: 'como-marketing', title: 'Como Marketing', status: 'exploring', prefix: 'COM', lastActivity: back(9),
      milestones: { done: 1, total: 3 },
      tasks: [
        { id: 'COM-001', text: 'Trancher les questions ouvertes', state: 'open', size: 'main', due: null, contact: null },
        { id: 'COM-012', text: 'Écrire la séquence', state: 'doing', size: 'main', due: null, contact: null, session: 'https://claude.ai/code/session_x' },
        { id: 'COM-015', text: 'Comparer deux micros-cravate', state: 'open', size: 'small', due: null, contact: null },
        { id: 'COM-014', text: 'Relancer Marc', state: 'open', size: 'main', due: back(3), contact: 'marc' },
        { id: 'COM-016', text: 'Envoyer le devis', state: 'open', size: 'main', due: ahead(2), contact: null },
      ],
    },
    {
      slug: 'lettre-de-sortie', title: 'Lettre de sortie', status: 'paused', prefix: 'LDS', lastActivity: back(30),
      milestones: { done: 1, total: 4 }, tasks: [],
    },
  ],
  dated: [
    { kind: 'task', id: 'COM-014', text: 'Relancer Marc', due: back(3), project: 'como-marketing' },
    { kind: 'task', id: 'COM-016', text: 'Envoyer le devis', due: ahead(2), project: 'como-marketing' },
    { kind: 'contact', id: 'jonas', text: 'Relancer Jonas', due: DAY, project: null },
  ],
}

test('rappels : échus et Admin sans date, jamais le futur', () => {
  const list = reminders(HQ, DAY)
  expect(list.map(r => r.key)).toEqual(['task:COM-014', 'contact:jonas', 'task:ADM-001'])
  expect(list[0]?.late).toBe(3)
  expect(daysBetween(back(3), DAY)).toBe(3)
})

test('cartes : Admin caché, pause repliée, petites tâches à part', () => {
  const { active, folded } = cards(HQ, DAY)
  expect(active.map(c => c.project.slug)).toEqual(['como-marketing'])
  expect(folded.map(c => c.project.slug)).toEqual(['lettre-de-sortie'])
  expect(active[0]?.doing.map(t => t.id)).toEqual(['COM-012'])
  expect(active[0]?.small.map(t => t.id)).toEqual(['COM-015'])
  expect(active[0]?.idle).toBe(9)
})

const PANE = {
  plugin: 'work-hq',
  component: 'Pane',
  requestId: 'work-hq',
  props: {
    title: 'Work HQ', isFocused: false, bodyColumns: 48, placement: 'dock',
    scroll: { offset: 0, bodyRows: 40 }, view: {},
  },
} as const

const CALENDARS = { calendars: [{ id: 'me@example.com', summary: 'me@example.com' }] }
const EVENTS = { items: [{ summary: 'Call client', start: { dateTime: `${DAY}T14:00:00+01:00` } }] }

test('le panneau dessine les quatre sections et replie, sur chaque surface', async ($, on) => {
  on('fs.exists', () => ({ value: true }))
  on('fs.stat', () => ({ value: { kind: 'file', size: 10, mtimeMs: 1, isLink: false } }))
  on('fs.read', () => ({ value: JSON.stringify(HQ) }))
  on('mcp.call', (_, e) => ({
    value: {
      isError: false,
      content: [{ type: 'text', text: JSON.stringify(e.tool === 'list_calendars' ? CALENDARS : EVENTS) }],
    },
  }))
  on('command.register', () => ({ value: { command: 'hq' } }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('clock.every', () => ({ value: undefined }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))

  await $.session.start({ cwd: '/hub', surface: 'desktop', isInteractive: true })

  for (const surface of ['terminal', 'desktop', 'vscode', 'mobile'] as const) {
    const ui = await $.ui.mount({ ...PANE, surface })
    expect((await ui.find({ type: 'Text', text: /Call client/ }))?.text).toBe('Call client')
    expect((await ui.find({ type: 'Link' }))?.text).toMatch(/COM-012$/)
    expect(await ui.find({ type: 'Text', text: /Jalons/ })).toBeUndefined()
    expect((await ui.find({ type: 'Text', text: /Payer la facture/ }))?.text).toBe('Payer la facture Swisscom')
    expect(await ui.find({ type: 'Text', text: /Comparer deux micros/ })).toBeUndefined()
    await ui.press({ key: 'small:como-marketing' })
    expect((await ui.find({ type: 'Text', text: /Comparer deux micros/ }))?.text).toBe('Comparer deux micros-cravate')
    await ui.press({ key: 'small:como-marketing' })
    await ui.unmount()
  }
})

test('sur mobile, une ligne au-dessus du prompt compte les rappels', async ($, on) => {
  on('fs.exists', () => ({ value: true }))
  on('fs.stat', () => ({ value: { kind: 'file', size: 10, mtimeMs: 2, isLink: false } }))
  on('fs.read', () => ({ value: JSON.stringify(HQ) }))
  on('mcp.call', () => ({ value: { isError: true, content: [{ type: 'text', text: 'offline' }] } }))
  on('command.register', () => ({ value: { command: 'hq' } }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('clock.every', () => ({ value: undefined }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  await $.session.start({ cwd: '/hub', surface: 'mobile', isInteractive: true })

  const band = await $.ui.mount({ plugin: 'work-hq', component: 'AbovePrompt', surface: 'mobile', props: {} } as never)
  expect((await band.find({ type: 'Text', text: /rappel/ }))?.text).toBe('3 rappels')
  await band.unmount()
})

test('/hq en texte : sections, petites tâches repliées puis montrées', () => {
  const agenda = { status: 'ok', day: DAY, calendar: 'principal', events: [{ time: '14:00', title: 'Call client' }] } as const
  const short = summary(HQ, agenda, DAY, false)
  expect(short).toContain('14:00  Call client')
  expect(short).toContain('RAPPELS (3)')
  expect(short).toContain('Payer la facture Swisscom')
  expect(short).toContain('▶ COM-012 Écrire la séquence')
  expect(short).toContain('+ 1 petite tâche (/hq tout)')
  expect(short).not.toContain('Comparer deux micros')
  expect(short).toContain('En pause : Lettre de sortie (1/4)')
  expect(summary(HQ, agenda, DAY, true)).toContain('COM-015 Comparer deux micros-cravate')
})

test('/hq répond par le texte du dashboard', async ($, on) => {
  on('fs.exists', () => ({ value: true }))
  on('fs.stat', () => ({ value: { kind: 'file', size: 10, mtimeMs: 3, isLink: false } }))
  on('fs.read', () => ({ value: JSON.stringify(HQ) }))
  on('mcp.call', (_, e) => ({
    value: { isError: false, content: [{ type: 'text', text: JSON.stringify(e.tool === 'list_calendars' ? CALENDARS : EVENTS) }] },
  }))
  on('command.register', () => ({ value: { command: 'hq' } }))
  on('ui.open', () => ({ value: { isPlaced: false, reason: 'no-surface' } }))
  on('clock.every', () => ({ value: undefined }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  await $.session.start({ cwd: '/hub', surface: null, isInteractive: true })

  const res = await $.command.run({ command: 'hq', args: '' } as never)
  expect((res as { text?: string }).text).toContain('Call client')
  expect((res as { text?: string }).text).toContain('RAPPELS (3)')
})

test('le skill hq a déjà /hq : le panneau s\'ouvre quand même', async ($, on) => {
  on('fs.exists', () => ({ value: true }))
  on('fs.stat', () => ({ value: { kind: 'file', size: 10, mtimeMs: 3, isLink: false } }))
  on('fs.read', () => ({ value: JSON.stringify(HQ) }))
  on('mcp.call', (_, e) => ({
    value: {
      isError: false,
      content: [{ type: 'text', text: JSON.stringify(e.tool === 'list_calendars' ? CALENDARS : EVENTS) }],
    },
  }))
  on('command.register', () => {
    throw new Error('"/hq" refused: it is the user\'s /hq')
  })
  const opened: string[] = []
  on('ui.open', (_, e) => {
    opened.push(e.id)
    return { value: { isPlaced: true } }
  })
  on('clock.every', () => ({ value: undefined }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))

  await $.session.start({ cwd: '/hub', surface: 'desktop', isInteractive: true })
  expect(opened.length).toBe(1)
  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  expect((await ui.find({ type: 'Text', text: /Call client/ }))?.text).toBe('Call client')
  await ui.unmount()
})
