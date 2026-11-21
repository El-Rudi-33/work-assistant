export type HqTask = {
  id: string
  text: string
  state: 'open' | 'doing'
  size: 'main' | 'small'
  due: string | null
  contact: string | null
  /** La dernière conversation (claude.ai) dont la fiche de session cite la tâche. Absent avant xref.py v2. */
  session?: string | null
}

export type HqProject = {
  slug: string
  title: string
  status: string
  prefix: string
  lastActivity: string | null
  milestones: { done: number; total: number }
  tasks: HqTask[]
}

export type HqDated = {
  kind: 'task' | 'contact'
  id: string
  text: string
  due: string
  project: string | null
}

/** projects/_hq.json, écrit par _tools/xref.py. */
export type Hq = { version: 1; projects: HqProject[]; dated: HqDated[] }

export type CalEvent = { time: string; title: string }

export type Agenda =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ok'; day: string; calendar: 'travail' | 'principal'; events: CalEvent[] }

declare module 'claude-code' {
  interface PluginState {
    'work-hq': {
      hq: Shaped<Hq | null>
      agenda: Shaped<Agenda>
      expanded: Shaped<string[]>
    }
  }
}
