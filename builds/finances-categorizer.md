---
title: Catégorisation de transactions bancaires
description: Ingère les exports CSV UBS, catégorise les transactions par dictionnaire puis par agent Claude en repli, stocke en SQLite
status: prototype
project: —
repo: El-Rudi-33/finances
path: src/
stack: [python, sqlite, claude-code]
knowhow: []
updated: 2026-11-21
---
# Catégorisation de transactions bancaires

`status` : prototype | prod | abandonné. Fiche tirée de la documentation du repo le 2026-11-21, code non relu.

## Ce qu'elle fait
CSV UBS (séparateur `;`, 8 lignes d'en-tête) → dédoublonnage → dictionnaire statique → agent Claude pour l'inconnu → SQLite → analyse.

## Comment la lancer
`python pipeline.py` (voir `CLAUDE.md` du repo).

## Réutilisable
- [`src/categorizer.py`](https://github.com/El-Rudi-33/finances/blob/main/src/categorizer.py) : classification en deux couches : règles d'abord, LLM en repli
- [`src/deduplicator.py`](https://github.com/El-Rudi-33/finances/blob/main/src/deduplicator.py) : dédoublonnage par hash

## Leçons techniques

## Limites
Repo de vie. Porte encore un dossier `.planning/` (GSD).
