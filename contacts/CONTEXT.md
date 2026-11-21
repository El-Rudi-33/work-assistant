# contacts - une fiche par personne

Chaque fiche est une copie de `_templates/contact.md`, nommée `prenom-nom.md`.

- `next_followup` est la date de relance : le brief du matin liste les relances échues.
- Après chaque échange : une ligne dans `## Historique`, et mettre à jour `last_contact`.
- Les tâches liées à une personne la citent par `@prenom-nom` ; la fiche ne recopie pas les tâches.
- Index : `python -I _tools/index.py contacts`.
