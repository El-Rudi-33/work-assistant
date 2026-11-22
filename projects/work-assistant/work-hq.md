---
title: Work HQ — le dashboard du hub
description: Conception vivante du panneau Work HQ (mod mods/work-hq) — ce qu'il montre, d'où viennent les données, ce qui vient ensuite
status: open
updated: 2026-11-21
---
# Work HQ — le dashboard du hub

Le panneau qui s'ouvre à côté de la conversation quand une session tourne dans `work-assistant`. Il grandit par versions ; chaque évolution est une tâche WA.

## Version actuelle : v1 (WA-006)

De haut en bas, chaque section dans un cadre :

1. **Aujourd'hui** : les événements du jour, via le connecteur Google Calendar. Calendrier « Travail » s'il existe, sinon le principal avec une mention (WA-005).
2. **Rappels** : un seul flux, quel que soit le type (facture, relance, échéance).
   - une tâche ouverte dont l'échéance `⏰` est atteinte, dans n'importe quel projet ;
   - un contact dont `next_followup` est atteint ;
   - toute tâche ouverte du projet `admin` sans date.
   - Un rappel reste affiché jusqu'à ce que la tâche soit cochée. Il indique depuis combien de jours il attend (orange, puis rouge au-delà de 7 j).
3. **Projets** : une carte par projet actif, le moins récemment touché en bas.
   - statut, jours depuis la dernière activité (rouge au-delà de 7 j), barre des jalons ;
   - tâches en cours `[~]` d'abord (▶), puis les autres tâches principales ;
   - « ▸ N petites tâches » : les tâches `#petit`, repliées ;
   - « ▸ En pause » : les projets `paused` et `done`, repliés.
4. **Boutons** : `/wrap`, `/new-build`, « Brief du matin », « Handoff ». Handoff ouvre un champ : la tâche décrite part au skill `handoff` (`.claude/skills/handoff/`), qui écrit `projects/<slug>/handoff-<sujet>.md` et ouvre une nouvelle conversation cloud qui la reprend. Les boutons lancent les commandes par `$.command.run` : un prompt qui commence par `/` est refusé au mod.

**Sur le téléphone : le skill `/hq`.** L'app Android n'affiche ni panneau ni ligne de mod, et n'envoie pas les commandes de mod (un `/hq` tapé arrive comme texte). Le skill `hq` (`.claude/skills/hq/`) lit l'agenda puis lance `python -I _tools/hq.py` : le dashboard en texte, dans le même ordre ; `/hq tout` montre aussi les petites tâches. `_tools/hq.py` reprend les règles du mod : changer l'un, changer l'autre. La ligne mobile au-dessus du prompt reste dans le code, au cas où l'app la dessine un jour.

## D'où viennent les données

- Le mod lit un seul fichier : `projects/_hq.json`, écrit par `python -I _tools/xref.py` (lancé par `/wrap`). Il ne parse aucune fiche.
- Le fichier est relu dès qu'il change (vérification toutes les 20 s et à la fin de chaque tour) ; l'agenda est relu toutes les 15 min.
- Format des tâches : `_shared/task-format.md` (`[~]` en cours, `#petit`, `⏰`).
- Classer une tâche : petite si elle ne fait avancer aucun jalon. Claude propose la taille à la création, Thomas corrige.

## Ouvrir le panneau

Une nouvelle conversation sur work-assistant (cloud ou locale) : le panneau s'ouvre à côté de la conversation ; `/hq` le rouvre.

## Code

- `mods/work-hq/` : `hooks/register.tsx` (le mod), `types/index.d.ts` (état), `tests/work-hq.test.tsx`.
- Développer : modifier `mods/work-hq`, `claude plugin validate` et `claude plugin test`, relever `version`, pousser sur la branche par défaut, puis nouvelle conversation pour voir le résultat.

## Où le panneau s'affiche (corrigé le 2026-11-21)

- **Il marche en session cloud**, à condition que la conversation démarre avec les mods installés : catalogue `.claude-plugin/marketplace.json` et `.claude/settings.json` sur la branche par défaut. Vérifié par Thomas dans une nouvelle conversation cloud.
- **Installation en cloud (2026-11-22)** : `.claude/settings.json` ne suffit pas. Au démarrage d'une conversation, le catalogue qu'il déclare n'est pas enregistré (`marketplace not registered`, vu dans le journal), et les mods sont ignorés ; c'était le cas de la conversation « Prochaines étapes automatisation business ». Ce qui marche, testé : le script de démarrage de l'environnement cloud `personal-assistant` installe les deux mods au niveau utilisateur (`claude plugin marketplace add El-Rudi-33/work-assistant`, puis `claude plugin install <mod>@work-assistant-mods`).
- Le work-hq 0.2.0 de la branche par défaut plantait au démarrage (`/hq` déjà pris par le skill `hq`) : corrigé en 0.3.0.
- **Ce qui ne marche pas** : des mods chargés en cours de conversation (dossier de mods de session, rechargement à chaud). Dans la conversation qui les a construits, aucune app ne s'est connectée pour les dessiner (`no surface is attached`), ni sur desktop ni sur Android. Conséquence : pour voir un changement, le pousser sur la branche par défaut (avec `version` relevée) et ouvrir une nouvelle conversation.
- **Téléphone** : pas encore vérifié dans une conversation qui démarre avec les mods. Le skill `/hq` (texte) reste le repli partout.

## Ensuite (pistes, pas encore des tâches)

- Cocher une tâche ou repousser un rappel depuis le panneau (aujourd'hui il faut le demander à Claude).
- Un panneau « vie » dans `personal-assistant`, même principe.
- Rappel `/wrap` quand une session dure sans clôture ; ligne de statut avec le projet courant.
- Prévenir quelques jours avant une échéance (aujourd'hui : seulement à partir de la date).

## Décisions

- 2026-11-22 · Le handoff crée la conversation suivante lui-même (`create_session`), avec la fiche complète dans le premier message ; la fiche reste dans le projet, reliée par `from:` et `to:`.

- 2026-11-21 · Affiché « Étapes », pas « Jalons » (le mot ne plaît pas à Thomas) ; le titre `## Jalons` des fiches projet ne change pas.

- 2026-11-21 · Pas de section « Session en cours » : sans utilité pour Thomas.
- 2026-11-21 · Les rappels sont des tâches datées, pas un fichier à part ; ce qui n'a pas de projet va dans `admin` (ADM).
- 2026-11-21 · Sur mobile, le dashboard passe par le skill `/hq` (texte produit par `_tools/hq.py`), faute de panneau et de commande de mod.
- 2026-11-21 · Le dashboard vit dans le projet work-assistant (tâches WA), pas dans un projet séparé.
