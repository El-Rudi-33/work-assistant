import type { Register, ThemeSetArgs } from 'claude-code'

import { problems, theme } from './colors.js'

// No overrideColorScheme: the app's light/dark toggle picks the Solarized half.
const LOOK: ThemeSetArgs = {
  colors: theme,
  style: {
    Text: { fontFamily: ['serif'], fontSize: 16, lineHeight: 25 },
    Heading: { fontFamily: ['serif'], fontWeight: 'semibold' },
  },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))
    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)
    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }
    return next(e)
  })
}
