# Format des tâches

Une ligne par tâche, dans `projects/<slug>/tasks.md`. Seul endroit où une tâche existe.

```
- [ ] COM-014 Relancer Marc pour les données prix @marc-dupont ⏰2026-11-25
- [~] COM-012 Écrire la séquence d'e-mails de prospection
- [ ] COM-015 Comparer deux micros-cravate pour les calls #petit
- [x] COM-009 Choisir l'API de transcription
```

- État : `[ ]` ouverte, `[~]` en cours (commencée), `[x]` finie.
- ID : préfixe du projet (`_shared/repos.md`) + numéro sur trois chiffres, jamais réutilisé.
- `@slug` : contact concerné, fichier `contacts/<slug>.md`.
- `⏰AAAA-MM-JJ` : échéance. Le brief du matin la pose dans le calendrier « Travail ». Une fois la date atteinte, la tâche apparaît dans les Rappels du panneau Work HQ jusqu'à ce qu'elle soit cochée.
- `#petit` : tâche secondaire, repliée dans le panneau. Critère : elle ne fait avancer aucun jalon du projet. Sans marque, une tâche est principale. Claude propose la taille à la création ; Thomas corrige.
- Une tâche finie reste dans le fichier, cochée. Le ménage se fait par déplacement sous `## Archivées`.
- Les sessions ne recopient jamais une tâche : elles citent son ID.
