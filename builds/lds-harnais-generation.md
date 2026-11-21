---
title: Harnais de génération Lettre de sortie
description: Pipeline mesuré qui transforme des notes de consultation en lettre de sortie sans rien inventer : triage ancré par citations, plan déterministe, rédaction par slots, validateurs, réparation ciblée
status: prototype
project: LDS
repo: El-Rudi-33/lettre-de-sortie
path: dev/harnais/
stack: [python, llm]
knowhow: [grounded-generation]
updated: 2026-11-21
---
# Harnais de génération Lettre de sortie

`status` : prototype | prod | abandonné. Fiche tirée de la documentation du repo le 2026-11-21, code non relu.

## Ce qu'elle fait
Triage ancré par citations → plan déterministe → rédaction par slots → assemblage → validateurs → réparation. Développé par phases avec portes de test (P0 → P7).

## Comment la lancer
Voir `dev/harnais/CLAUDE.md` (index des phases, squelette, nommage).

## Réutilisable
- [`dev/plan-implementation-agentique.md`](https://github.com/El-Rudi-33/lettre-de-sortie/blob/main/dev/plan-implementation-agentique.md) : méthode par phases et portes de test, réutilisable pour tout pipeline LLM mesuré
- [`dev/harnais/CLAUDE.md`](https://github.com/El-Rudi-33/lettre-de-sortie/blob/main/dev/harnais/CLAUDE.md) : carte du harnais

## Leçons techniques

## Limites
P7 en pause. Corpus fictif ou anonymisé (PARHAF).
