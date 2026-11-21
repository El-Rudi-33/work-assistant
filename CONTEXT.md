# work-assistant - la carte du système

Le flux en une ligne : je travaille dans un projet, je clôture la session, le soir le hub résume ce qui a bougé, le matin il propose la journée.

## Bibliothèques (les fiches s'accumulent)

| Dossier | Unité | Modèle | Index généré |
|---|---|---|---|
| `projects/` | un projet | `_templates/project/` | `projects/_index.md` |
| `contacts/` | une personne | `_templates/contact.md` | `contacts/_index.md` |
| `sessions/` | une conversation | `_templates/session.md` | `sessions/_index.md` (tâche → sessions) |
| `builds/` | une automatisation | `_templates/build.md` | `builds/_index.md` |
| `knowhow/` | un pattern technique | `_templates/knowhow.md` | `knowhow/_index.md` (pattern → builds) |

## Pipelines (une étape après l'autre, un check entre chaque)

| Pipeline | Étapes | Déclencheur |
|---|---|---|
| `cycle/` | `01_wrap` → `02_collect` → `03_digest` → `04_brief` | fin de session, soir, matin |
| `new-build/` | `01_scout` → `02_spec` → `03_scaffold` → `04_register` | « nouvelle automatisation » |

## Les trois cerveaux

Définis dans `_shared/knowledge-sources.md` : Research (entrée), business-brain (quoi vendre), ce hub (comment construire).

## Usine et produit

- Usine (stable) : `_shared/`, `_templates/`, `_tools/`.
- Produit (chaque exécution) : les fiches des bibliothèques, les `output/` des étapes.

L'état se lit sur le disque : une étape est faite quand son `output/` contient l'artefact et que son `check.md` dit `pass`.
