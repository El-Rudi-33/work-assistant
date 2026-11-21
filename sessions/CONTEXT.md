# sessions - une fiche par conversation de travail

Écrites par [01_wrap](../cycle/01_wrap/CONTEXT.md), à partir de `_templates/session.md`. Nom : `AAAA-MM-JJ-HHMM-<préfixe>.md` (préfixe en minuscules).

- `tasks:` liste les IDs touchés. C'est le seul lien entre une conversation et ses tâches.
- Une conversation sur deux projets : une fiche par projet.
- `_index.md` est généré par `python -I _tools/xref.py` : pour chaque tâche, ses sessions ; pour chaque session, ses tâches.
