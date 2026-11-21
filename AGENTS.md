# work-assistant

Le QG de travail de Thomas : suivi des projets, tâches, contacts, sessions, et le savoir-faire technique des automatisations déjà construites. Il sert les repos projets sans jamais écrire dedans.

## Où vivent les choses

| Dossier | Contenu |
|---|---|
| `projects/` | bibliothèque : un dossier par projet (statut, tâches, décisions) |
| `contacts/` | bibliothèque : une fiche par personne |
| `sessions/` | bibliothèque : une fiche par conversation de travail |
| `builds/` | bibliothèque : une fiche par automatisation construite |
| `knowhow/` | bibliothèque : une recette par pattern technique |
| `cycle/` | pipeline quotidien : wrap → collect → digest → brief |
| `new-build/` | pipeline : démarrer une nouvelle automatisation |
| `_shared/` | références stables : registre des repos, formats, règles |
| `_templates/` | toute nouvelle fiche est une copie d'un modèle |
| `_tools/` | scripts, lancés depuis la racine |

## Route selon la situation

| Si | Va à | Arrête-toi à |
|---|---|---|
| une session s'ouvre avec un repo projet attaché | `_shared/repos.md` → `projects/<slug>/CONTEXT.md` et `tasks.md` | demander « on bosse sur quoi ? » |
| fin de session, ou « /wrap » | [01_wrap](cycle/01_wrap/CONTEXT.md) | le check de l'étape |
| routine du soir | [02_collect](cycle/02_collect/CONTEXT.md) | `check.md` ; `fail` = arrêt |
| routine du matin | [04_brief](cycle/04_brief/CONTEXT.md) | le check de l'étape |
| nouvelle automatisation | [01_scout](new-build/01_scout/CONTEXT.md) | le check de chaque étape |
| question business (offre, prix, cible) | skill `business-advisor` (repo business-brain) | le régime nommé |
| savoir général (vidéo, article ingéré) | `personal-assistant/Research/index.md`, puis la seule page utile | — |
| état d'un projet | `projects/_index.md` | rapporter ce qui existe |
| la carte complète | [CONTEXT.md](CONTEXT.md) | — |

## Les règles

- Ne charge que le contrat de l'étape et ses entrées, jamais tout le repo.
- Le hub n'écrit jamais dans un repo projet, en particulier un repo partagé.
- Rien ne passe à l'étape suivante tant que le check de la précédente n'est pas `pass`.
- Les `_index.md` sont générés : `python -I _tools/index.py <dossier>` et `python -I _tools/xref.py`, jamais édités à la main.
- Hors périmètre : tout repo de l'organisation AllHereGeneva. Ni fiche, ni description, ni lien.
