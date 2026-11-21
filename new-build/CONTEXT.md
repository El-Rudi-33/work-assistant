# new-build - démarrer une nouvelle automatisation

Le flux en une ligne : regarder ce qui existe déjà, écrire le brief, copier ce qui sert, enregistrer le résultat.

| Étape | Job |
|---|---|
| `01_scout` | trouver ce qui existe déjà |
| `02_spec` | écrire le brief de l'automatisation |
| `03_scaffold` | copier et adapter le réutilisable |
| `04_register` | créer la fiche, mettre à jour les recettes |

Une exécution = un sous-dossier `output/<slug>/` dans chaque étape. Les repos sources ne sont attachés qu'à l'étape 3, et seulement ceux choisis à l'étape 1.
