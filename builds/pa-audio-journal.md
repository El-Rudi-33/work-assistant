---
title: Journal audio
description: Transcrit un mémo vocal (Whisper), le classe (journal ou rêve), l'enrichit (résumé, thèmes) et écrit les fichiers du journal
status: prod
project: —
repo: El-Rudi-33/personal-assistant
path: Journal/scripts/
stack: [python, whisper, telegram]
knowhow: []
updated: 2026-11-21
---
# Journal audio

`status` : prototype | prod | abandonné. Fiche tirée de la documentation du repo le 2026-11-21, code non relu.

## Ce qu'elle fait
Audio (Telegram ou fichier) → transcription → classification → enrichissement → trois fichiers markdown → réponse Telegram.

## Comment la lancer
Skill `process-audio-journal` du repo personal-assistant.

## Réutilisable
- [`Journal/Dev/scripts/transcribe.py`](https://github.com/El-Rudi-33/personal-assistant/blob/main/Journal/scripts/transcribe.py) : transcription Whisper
- [`Journal/Dev/scripts/classify.py`](https://github.com/El-Rudi-33/personal-assistant/blob/main/Journal/scripts/classify.py) : classification d'un texte en catégorie avec date
- [`Journal/Dev/Docs/audio_journal_spec.md`](https://github.com/El-Rudi-33/personal-assistant/blob/main/Journal/Dev/Docs/audio_journal_spec.md) : spécification complète

## Leçons techniques

## Limites
Repo de vie.
