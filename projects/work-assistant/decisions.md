# Décisions — work-assistant

Journal en ajout seul. Une décision business majeure va aussi dans business-brain `decisions/`.

## 2026-11-21 · Architecture : hub séparé + un repo par projet (option B), méthode ICM
- Contexte : séparer vie et travail ; un repo projet (Como_Marketing) est partagé avec un associé.
- Choix : un hub privé qui n'écrit jamais dans les repos projets ; GSD abandonné ; trois cerveaux (Research = entrée, business-brain = quoi vendre, ce hub = comment construire).
- Pourquoi : isolation des repos partagés, mémoire séparée par repo, routines qui ne lisent que les changements.
- Ce qui la remettrait en cause : si l'ouverture de deux repos par session devient une friction quotidienne.

## 2026-11-21 · AllHereGeneva hors périmètre
- Contexte : repos de l'organisation, code non destiné au hub personnel.
- Choix : aucune fiche, aucune description, aucune ligne dans `_shared/repos.md`.
- Pourquoi : confidentialité de l'organisation.
- Ce qui la remettrait en cause : un accord explicite de l'organisation.

## 2026-11-21 · Mods permanents : catalogue dans ce repo
- Contexte : les mods écrits en session disparaissent avec le conteneur cloud.
- Choix : `.claude-plugin/marketplace.json` liste `mods/*`, `.claude/settings.json` les active pour toute session sur work-assistant.
- Pourquoi : le plus simple, les mods vivent avec le workflow.
- Ce qui la remettrait en cause : d'autres repos ont besoin des mods sans dépendre du hub (alors un repo dédié).
