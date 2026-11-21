# mods - les mods Claude du workflow

Un dossier par mod (plugin Claude Code : `.claude-plugin/plugin.json`, `hooks/hooks.json`, `hooks/register.ts`). Le code vit ici pour survivre aux conteneurs cloud.

| Mod | Ce qu'il fait | État |
|---|---|---|
| `solarized/` | thème Solarized clair / sombre selon le mode de l'app, texte en serif | chargé et validé le 2026-11-21, jamais vu à l'écran |
| `work-hq/` | panneau Work HQ : agenda, rappels, projets, boutons ; ligne au-dessus du prompt sur mobile. Conception : [work-hq.md](../projects/work-assistant/work-hq.md) | v1, testé (`claude plugin test`), à voir à l'écran |

- Développer : charger le skill `plugin-authoring`, copier le mod dans le dossier de mods de la session, itérer, puis recopier ici.
- `hooks/make-colors.js` vient du skill `plugin-authoring` : le recopier quand le build de Claude Code change (voir le `look.md` du skill).
- Installation durable (2026-11-21) : `.claude-plugin/marketplace.json` à la racine liste les mods (catalogue `work-assistant-mods`) ; `.claude/settings.json` les active dans chaque session ouverte sur ce repo. Ajouter un mod = une entrée dans le catalogue + une ligne `enabledPlugins` (`claude plugin install <mod>@work-assistant-mods --scope project`).
- Le catalogue est lu depuis GitHub (`El-Rudi-33/work-assistant`, branche par défaut) : un mod modifié n'arrive dans les sessions qu'une fois poussé sur la branche par défaut, avec `version` relevée dans son `plugin.json`.
- Les mods ne s'affichent qu'en session locale (app desktop, onglet Code, ou terminal) ; en session cloud, aucune app ne les dessine. Voir `projects/work-assistant/work-hq.md`.
