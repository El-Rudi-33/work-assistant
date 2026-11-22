---
title: Lettre de sortie
description: Générer des lettres de sortie médicales (Suisse romande) à partir des notes de consultation, sans jamais inventer de contenu clinique
status: paused
prefix: LDS
repo: El-Rudi-33/lettre-de-sortie (+ El-Rudi-33/Lettre-de-sortie-com pour le site)
updated: 2026-11-21
---
# Lettre de sortie

`status` : exploring | building | paused | done. Source de vérité du projet : son propre repo ; cette fiche n'en garde que le suivi.

## But
Un MVP en pilote fermé : le harnais de génération (repo `lettre-de-sortie`) branché sur le site (repo `Lettre-de-sortie-com`).

## Jalons
- [x] Phases P0 à P6 du harnais validées (2026-08-08)
- [ ] P7 : benchmark multi-modèles (en pause)
- [ ] Orchestrateur du site branché sur le harnais (`boucle/orchestrateur.js`)
- [ ] Passages juridiques encore ouverts tranchés avec un avocat

## Prochaines actions
LDS-001, LDS-002.

## Blocages
- P7 en pause depuis le passage Qwen3.5-397B (README, 2026-08-08).

## Pistes
- Les règles de travail du repo imposent la branche `agentic-loop-dev` : jamais de branche `claude/…` là-bas.
- Concurrents vus le 2026-11-22 dans l'annuaire SwissMed AI (mdai.ch/tools, 147+ outils) : Aida Medical, scribe qui rédige la note pendant la consultation et propose ICD-10 et TARDOC ; Xander, dictée vers rapport structuré avec prestations TARDOC, médicaments et matériel. Page Research : `wiki/ai-technology/swissmed-ai-tool-directory.md`.
