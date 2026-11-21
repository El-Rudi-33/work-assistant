---
title: Digest et comparaison de livres
description: Pipeline ICM qui extrait des livres PDF/EPUB, les résume chapitre par chapitre avec références, puis les compare par concept
status: prod
project: —
repo: El-Rudi-33/Manifestation-Study
path: /
stack: [python, claude-code, skills, pdf, epub]
knowhow: [icm-workspace, grounded-generation]
updated: 2026-11-21
---
# Digest et comparaison de livres

`status` : prototype | prod | abandonné. Fiche tirée de la documentation du repo le 2026-11-21, code non relu.

## Ce qu'elle fait
`00-sources` (texte extrait) → `01-digest` (fiche livre, digests de chapitres) → `02-compare` (matrice, pages concepts) → `03-synthesis`. Chaque affirmation porte une référence `[p. 42]` ou `[ch03 ¶17]`.

## Comment la lancer
Déposer le livre dans `00-sources/<slug>/`, puis « digest `<slug>` » (skill `digest-book`).

## Réutilisable
- [`CLAUDE.md`](https://github.com/El-Rudi-33/Manifestation-Study/blob/main/CLAUDE.md) : la carte du pipeline et la règle de référencement
- [`taxonomy.md`](https://github.com/El-Rudi-33/Manifestation-Study/blob/main/taxonomy.md) : vocabulaire partagé entre livres

## Leçons techniques

## Limites
Repo de vie : sert de modèle pour tout corpus de documents à digérer.
