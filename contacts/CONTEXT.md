# contacts - une fiche par personne, tout le réseau

Un seul réseau, perso et pro ensemble (décision de Thomas, 2026-11-21) : ami, contact pro, chercheur, tout le monde est ici. Les fiches de conversations de dating restent dans `personal-assistant/Dating/`.

Chaque fiche est une copie de `_templates/contact.md`, nommée `prenom-nom.md`.

- `next_followup` est la date de relance : le brief du matin liste les relances échues.
- Après chaque échange : une ligne dans `## Historique`, et mettre à jour `last_contact`.
- Les tâches liées à une personne la citent par `@prenom-nom` ; la fiche ne recopie pas les tâches.
- Index : `python -I _tools/index.py contacts`.
