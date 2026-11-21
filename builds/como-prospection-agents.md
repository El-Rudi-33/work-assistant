---
title: Agents de prospection Como
description: Cinq agents récurrents de prospection B2B (signaux, recherche de compte, capture de call, mémo hebdo, hygiène de liste), chacun avec sa fiche de poste et son skill
status: prototype
project: COM
repo: El-Rudi-33/Como_Marketing
path: agents/
stack: [claude-code, skills, markdown, csv]
knowhow: [icm-workspace, grounded-generation, repo-interface-contract]
updated: 2026-11-21
---
# Agents de prospection Como

`status` : prototype | prod | abandonné. Fiche tirée de la documentation du repo le 2026-11-21, code non relu.

## Ce qu'elle fait
Chaque agent a une fiche de poste (source, fréquence, filtres, sortie, métrique unique, ce qui exige une approbation) et un skill. Aucun n'envoie de message : l'humain envoie. Le skill `handoff` échange avec le repo build via `exchange/`.

## Comment la lancer
Skills `signal-scan`, `account-research`, `call-capture`, `cockpit-memo`, `handoff` dans `.claude/skills/` ; `list-hygiene` via sa fiche.

## Réutilisable
- [`agents/CONTEXT.md`](https://github.com/El-Rudi-33/Como_Marketing/blob/main/agents/CONTEXT.md) : le format « fiche de poste d'agent », copiable tel quel pour un autre projet
- [`exchange/CONTRACT.md`](https://github.com/El-Rudi-33/Como_Marketing/blob/main/exchange/CONTRACT.md) : un contrat d'échange entre deux repos privés, à adapter

## Leçons techniques

## Limites
Repo partagé : le hub n'y écrit jamais.
