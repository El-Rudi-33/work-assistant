---
title: Recherche — prolifération de branches (WA-009)
description: Faits vérifiés, options et état des lieux pour mettre fin à une branche par conversation
status: open
updated: 2026-11-21
---
# Recherche — prolifération de branches (WA-009)

Synthèse d'un agent de recherche, 2026-11-21. Rien n'est décidé.

## État des lieux (branches distantes, 2026-11-21)

| repo | branches | dont `claude/*` |
|---|---|---|
| personal-assistant | 42 | 28 |
| Como_Marketing | 25 | 13 |
| SENTRA-Research | 17 | 10 |
| lettre-de-sortie | 9 | 3 |
| business-brain | 4 | 2 |
| Lettre-de-sortie-com | 4 | 3 |
| finances | 4 | 2 |
| work-assistant | 1 | 1 |

## Faits établis par la documentation Anthropic

- Une session pousse sur `claude/...` « unless your prompt directs it to push to another branch ». Une règle dans le prompt ou le CLAUDE.md change la cible. Il n'existe pas de réglage d'environnement pour cela. Les Projects claude.ai peuvent fixer une branche cible pour toutes leurs conversations.
- Le proxy GitHub des sessions cloud **refuse les suppressions de branches**. Une routine cloud ne peut donc pas nettoyer elle-même (issues anthropics/claude-code 99384 et 59606).
- Le proxy ne limite pas les branches sur lesquelles on peut pousser. Pour limiter, il faut des règles GitHub.

## Côté GitHub (pages non lues en direct, à vérifier)

- **« Automatically delete head branches »** (Settings > General) : gratuit, supprime la branche à chaque merge.
- **Auto-merge, protection de branche et rulesets** sur les repos privés : apparemment réservés aux plans payants. À vérifier selon ton plan.
- **Actions de nettoyage planifiées** (`cbrgm/cleanup-stale-branches-action`, `liatrio/prune-stale-branches-action`) : elles tournent côté GitHub et peuvent supprimer des branches.

## Options

- **A. Repos solo : travail direct sur `main`.** Règle dans le CLAUDE.md : `git pull --rebase` avant chaque push, jamais de `claude/`. Zéro branche, mais pas de revue, et des conflits possibles entre sessions parallèles.
- **B. Une PR par session.** `/wrap` ouvre la PR et la merge si c'est fini, sinon il la laisse en brouillon. Avec auto-delete activé. C'est la seule voie pour Como_Marketing (repo partagé : PR et brief de décision, go du partenaire).
- **C. Ménage nocturne depuis le hub.** Inventaire des branches de tous les repos, en lecture seule, avec un rapport dans le brief du matin. Il ne merge que sur ton go. Ça demande d'assouplir la règle « le hub n'écrit jamais dans un repo projet », ou de rester en simple rapport.
- **D. Combinaison recommandée** : A pour les repos solo, B pour Como, auto-delete partout, C en filet de sécurité qui fait seulement un rapport. lettre-de-sortie garde sa règle des deux branches (`main`, `agentic-loop-dev`).

## Pièges

- Ne jamais supprimer une branche qui porte des commits absents de `main`. Avec le squash-merge, `git branch --merged` est trompeur : se fier à l'état de la PR.
- Deux sessions qui poussent sur `main` en même temps : le rebase est obligatoire.
- Le comportement par défaut de la plateforme peut l'emporter sur une règle du CLAUDE.md. La garantie dure, c'est une règle GitHub.

## Sources

- https://code.claude.com/docs/en/routines
- https://code.claude.com/docs/en/cloud-environments
- https://code.claude.com/docs/en/claude-code-on-the-web
- https://code.claude.com/docs/en/claude-projects
- https://github.com/anthropics/claude-code/issues/99384
- https://github.com/anthropics/claude-code/issues/59606
- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-the-automatic-deletion-of-branches
- https://github.com/cbrgm/cleanup-stale-branches-action
