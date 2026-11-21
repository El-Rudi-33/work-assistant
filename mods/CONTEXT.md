# mods - les mods Claude du workflow

Un dossier par mod (plugin Claude Code : `.claude-plugin/plugin.json`, `hooks/hooks.json`, `hooks/register.ts`). Le code vit ici pour survivre aux conteneurs cloud.

| Mod | Ce qu'il fait | État |
|---|---|---|
| `solarized/` | thème Solarized clair / sombre selon le mode de l'app, texte en serif | chargé et validé le 2026-11-21, jamais vu à l'écran |

- Développer : charger le skill `plugin-authoring`, copier le mod dans le dossier de mods de la session, itérer, puis recopier ici.
- `hooks/make-colors.js` vient du skill `plugin-authoring` : le recopier quand le build de Claude Code change (voir le `look.md` du skill).
- Installation durable : voir `projects/work-assistant/handoff-mods.md`, section « Rendre les mods permanents ».
