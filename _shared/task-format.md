# Format des tâches

Une ligne par tâche, dans `projects/<slug>/tasks.md`. Seul endroit où une tâche existe.

```
- [ ] COM-014 Relancer Marc pour les données prix @marc-dupont ⏰2026-11-25
- [x] COM-009 Choisir l'API de transcription
```

- ID : préfixe du projet (`_shared/repos.md`) + numéro sur trois chiffres, jamais réutilisé.
- `@slug` : contact concerné, fichier `contacts/<slug>.md`.
- `⏰AAAA-MM-JJ` : échéance. Le brief du matin la pose dans le calendrier « Travail ».
- Une tâche finie reste dans le fichier, cochée. Le ménage se fait par déplacement sous `## Archivées`.
- Les sessions ne recopient jamais une tâche : elles citent son ID.
