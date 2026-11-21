---
title: Handoff — apparence et mods du workflow work-assistant
description: Tout ce qu'une nouvelle conversation doit savoir pour construire les mods Claude (thème, panneau Work HQ, commandes) autour de ce hub
status: open
updated: 2026-11-21
---
# Handoff — apparence et mods du workflow work-assistant

Écrit à la fin de la conversation qui a construit ce hub (2026-11-21). La nouvelle conversation part d'ici.

## À lire d'abord, dans cet ordre

1. `AGENTS.md` puis `CONTEXT.md` : la carte du hub.
2. Ce fichier.
3. `mods/CONTEXT.md` et `mods/solarized/` : le seul mod existant.
4. Pour les données que le panneau affichera : `projects/_index.md`, `contacts/_index.md`, `sessions/_index.md`, `builds/_index.md`, `knowhow/_index.md`.

## Préférences de Thomas

- Réponses en français, directes, sans emojis, sans résumé final.
- Thème : **Solarized**, clair et sombre, qui suit le bouton clair/sombre de l'app. La police serif lui plaît.
- Ne pas sur-structurer (méthode ICM, skill `icm-architect` dans ce repo).

## Ce qu'est un mod (vérifié dans cette session, build 2.1.330)

- Un mod est un plugin Claude Code à hooks : `.claude-plugin/plugin.json`, `hooks/hooks.json` (`{ "modules": ["./register.ts"] }`), `hooks/register.ts` qui exporte `register(on, options)`.
- La référence est le skill **`plugin-authoring`** : le charger d'abord. Il écrit les types de l'API (`claude-code.d.ts`, environ 14 000 lignes, à interroger avec grep) et donne le dossier de mods de la session. Ce dossier change à chaque session, d'où la copie dans `mods/` ici.
- Une fois les mods activés, chaque modification se recharge à chaud à la fin du tour.
- Outils : `claude plugin validate <dossier>`, `claude plugin test <dossier>`, `tsc -p <dossier>`.
- Ce que les mods peuvent faire, d'après les types :
  - **thème** : `$.theme.set({ colors, backdrop, style, sound })` au `session.start` ;
  - **panneau latéral** : `$.ui.open({ id, title })`, dessiné par un hook `ui.render` sur `{ component: 'Pane', requestId }` ;
  - **bandeau** au-dessus du prompt : `ui.render` sur `AbovePrompt` ;
  - **ligne de statut** : `$.ui.status(text)` ; **toast** : `$.ui.toast(text)` ;
  - **rendu des lignes de la conversation** : `UserMessage`, `AssistantMessage`, `ToolUse`, `ToolGroup` ;
  - **commandes slash** : `$.command.register` et un hook `command.run` ;
  - **lire des fichiers** : `$.fs` ; **minuteries** : `$.clock.every`, `$.clock.after` ;
  - **appeler un connecteur MCP** : `$.mcp.call("Google Calendar", "list_events", {...})`, sans prompt de permission ;
  - **lire la conversation** : `$.session` ;
  - **état partagé** : `atom`, `read`, `update`, avec un contrat `types/index.d.ts` dès qu'un mod utilise `$.state`.
- Limites :
  - Les thèmes ne s'affichent que dans les apps desktop et mobile. Le terminal ignore les thèmes mais affiche panneaux, bandeaux et statut.
  - Un mod ne voit pas la liste des autres conversations et ne peut pas réorganiser la barre latérale de l'historique.
  - Les prompts de permission gardent le look de l'app.

## Mod existant : `mods/solarized/`

- Palette Solarized de base. Ajustements nécessaires pour que Desktop accepte le thème (son contrôle de contraste refusait la première version) :
  - en sombre : `surface-1` `#04313c`, `surface-2` et `surface-3` = base02 `#073642`, `text-secondary` `#b4bdb9`, `text-muted` = base1 `#93a1a1` ;
  - en clair : base2 / `#f6f0dd` / base3 pour les surfaces, base02 / base01 / base00 pour le texte.
- Rôles : accent bleu, danger rouge, succès vert, alerte jaune, pro violet. Coloration du code `solarized-light` / `solarized-dark`.
- Style : `Text` et `Heading` en serif, 16 pt, interligne 25.
- État : validé (`claude plugin validate`) et chargé, mais **jamais vu à l'écran**. Première chose à faire : demander à Thomas un retour visuel.

## À construire (proposé, validé dans l'esprit, pas encore conçu en détail)

1. **Panneau Work HQ** (tâche WA-006) :
   - une carte par projet : statut, jalons faits / total, prochaine action, jours depuis la dernière activité (en rouge au-delà de 7) ;
   - section « Aujourd'hui » : le calendrier Google « Travail » via `$.mcp.call`. La tâche WA-005 (créer ce calendrier) n'est pas faite : prévoir un repli sur le calendrier principal ;
   - section « À relancer » : `next_followup` échu dans `contacts/` ;
   - section « Session en cours » : les tâches touchées.
   - Sources : uniquement les `_index.md` et les `tasks.md`, jamais tout le repo (règle anti-gaspillage du hub). Les `_index.md` actuels portent titre, description et statut. Si le panneau a besoin de plus (jalons, dernière activité), étendre `_tools/index.py` ou `_tools/xref.py` pour générer un index JSON plutôt que de parser les fiches dans le mod.
   - Boutons : `/wrap`, `/new-build`, « brief du matin ».
2. **Un panneau différent selon le repo** : Work HQ quand `work-assistant` est le dossier de travail ; un panneau « vie » (agenda, tâches perso, journal) dans `personal-assistant`. Détection par le dossier courant de la session.
3. **Rappel `/wrap`** : bandeau ou toast quand une session a duré longtemps sans clôture, ou avant de changer de projet.
4. **Ligne de statut** : projet courant et IDs de tâches de la session (par exemple `COM · COM-001 COM-004`).
5. Idée laissée en suspens : regrouper ou restyler les lignes d'outils (`ToolGroup`) par projet.

## Rendre les mods permanents (à décider avec Thomas)

Le dossier de mods de session est dans le conteneur cloud et disparaît avec lui. Deux voies, documentées dans le `reference.md` du skill `plugin-authoring`, section « Sharing a mod » :
- **Marketplace dans ce repo** : un `.claude-plugin/marketplace.json` qui liste `mods/*`, puis `/plugin install solarized --marketplace El-Rudi-33/work-assistant`. C'est le plus simple, et les mods vivent avec le workflow.
- **Un repo dédié aux mods**, si d'autres repos doivent en profiter sans dépendre du hub.

## État du hub au moment du handoff

- Repo `El-Rudi-33/work-assistant`, branche `claude/lucid-cerf-zmzgs6`, qui est la seule branche (pas encore de `main`).
- Fait : structure ICM, inventaire (projets COM, LDS, SEN, WA ; 8 builds ; 3 recettes ; contact Jonas).
- Tâches ouvertes liées : WA-005 (calendrier Travail), WA-006 (panneau). Autres : WA-003, WA-004, WA-007, WA-008, WA-009. Voir `projects/work-assistant/tasks.md`.
- WA-009 (prolifération de branches) : recherche faite, rien de décidé. Voir `research-branches.md` à côté de ce fichier. Ne pas la traiter dans la conversation sur les mods, sauf si Thomas le demande.
