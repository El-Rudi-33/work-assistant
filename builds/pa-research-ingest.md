---
title: Ingestion de sources dans le wiki
description: Ingère une vidéo YouTube, un PDF ou un article, archive la source brute et écrit une page wiki par concept ; une routine quotidienne surveille une playlist
status: prod
project: —
repo: El-Rudi-33/personal-assistant
path: Research/
stack: [claude-code, skills, supadata, scheduled-task]
knowhow: []
updated: 2026-11-21
---
# Ingestion de sources dans le wiki

`status` : prototype | prod | abandonné. Fiche tirée de la documentation du repo le 2026-11-21, code non relu.

## Ce qu'elle fait
Source → `Research/raw/` (brut) → `Research/wiki/` (une page par concept) → `index.md` et `log.md` mis à jour.

## Comment la lancer
Skills `research-ingest` et `research-capture` ; routine quotidienne de vérification de playlist.

## Réutilisable
- [`Research/CONTEXT.md`](https://github.com/El-Rudi-33/personal-assistant/blob/main/Research/CONTEXT.md) : le schéma du wiki et ses procédures

## Leçons techniques

## Limites
Repo de vie. C'est la porte d'entrée des recettes `emprunté` (WA-007).
