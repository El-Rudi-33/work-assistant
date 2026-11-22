---
title: Handoff — test du handoff
description: Premier essai du skill handoff — la conversation qui reprend vérifie qu'elle a reçu le contexte et le dit
status: open
date: 2026-11-22
project: work-assistant
tasks: [WA-010]
from: https://claude.ai/code/session_01RKNWyPLzWd8m9dXxx5cQTY
to: https://claude.ai/code/session_01RKNWyLoLwm39HBNWVxxz1s
---
# Handoff — test du handoff

## La tâche
Thomas a tapé « /handoff test » : c'est un essai du mécanisme, pas un vrai travail. La conversation qui reprend doit prouver qu'elle a tout reçu, sans rien construire.
Critère de fin : une réponse courte qui dit (1) ce qu'elle a compris de la tâche, (2) si elle trouve ce fichier dans le repo sur la branche `claude/dreamy-ramanujan-p1tnz7`, (3) un détail du contexte ci-dessous qu'elle n'aurait pas pu deviner.

## Ce que la conversation d'origine sait déjà
- Le skill `handoff` (`.claude/skills/handoff/SKILL.md`) et le bouton « Handoff » du panneau Work HQ (`mods/work-hq/hooks/register.tsx`) ont été écrits le 2026-11-22 dans la conversation d'origine.
- Le bouton lance la commande par `$.command.run({ command: 'handoff', args })` : un mod qui envoie un prompt commençant par `/` est refusé par le moteur. Les boutons `/wrap` et `/new-build` avaient ce bug, corrigé en même temps.
- Le panneau Work HQ a aussi reçu : sections encadrées, une case par tâche, « Étapes » au lieu de « Jalons » (le mot ne plaît pas à Thomas), numéro de tâche relié à la dernière conversation qui la cite (`session` dans `projects/_hq.json`, écrit par `_tools/xref.py`).
- Le catalogue de mods du repo (`.claude/settings.json`, `work-assistant-mods`) ne s'est pas chargé dans la session d'origine : les mods y ont été chargés depuis le dossier de mods de la session. Cause non cherchée.

## Par où commencer
1. Lire ce fichier dans le repo : `git fetch origin claude/dreamy-ramanujan-p1tnz7 && git show FETCH_HEAD:projects/work-assistant/handoff-test.md | head -5`.
2. Répondre selon le critère de fin, en trois lignes.

## Garde-fous
- Ne rien modifier ni commiter : pas de branche, pas de push. C'est un test.
- Ne pas cocher WA-010 : la conversation d'origine le fera après avoir lu la réponse.
