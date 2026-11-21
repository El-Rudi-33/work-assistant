import { makeColors } from './make-colors.js'

// Solarized palette (Ethan Schoonover)
export const SOL = {
  base03: '#002b36', base02: '#073642', base01: '#586e75', base00: '#657b83',
  base0: '#839496', base1: '#93a1a1', base2: '#eee8d5', base3: '#fdf6e3',
  yellow: '#b58900', orange: '#cb4b16', red: '#dc322f', magenta: '#d33682',
  violet: '#6c71c4', blue: '#268bd2', cyan: '#2aa198', green: '#859900',
}

export const { theme, problems } = makeColors({
  label: 'Solarized',
  roles: { accent: SOL.blue, danger: SOL.red, success: SOL.green, warning: SOL.yellow, pro: SOL.violet },
  light: {
    gray: {
      anchors: {
        'surface-0': SOL.base2,
        'surface-1': '#f6f0dd',
        'surface-2': SOL.base3,
        'text-primary': SOL.base02,
        'text-secondary': SOL.base01,
        'text-muted': SOL.base00,
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': SOL.base03,
        'surface-1': '#04313c',
        'surface-2': SOL.base02,
        'surface-3': SOL.base02,
        'text-primary': SOL.base2,
        'text-secondary': '#b4bdb9',
        'text-muted': SOL.base1,
      },
    },
  },
  codeTheme: { light: 'solarized-light', dark: 'solarized-dark' },
})
