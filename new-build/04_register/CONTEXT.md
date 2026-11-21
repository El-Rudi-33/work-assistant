# 04_register - créer la fiche, mettre à jour les recettes

Un seul job : que la prochaine automatisation trouve celle-ci à l'étape 01.

## Inputs
- Working : `../02_spec/output/<slug>/spec.md`, `../03_scaffold/output/<slug>/scaffold.md`.
- Reference : `_templates/build.md`, `_templates/knowhow.md`, `knowhow/_index.md`.

Do NOT load : les autres builds.

## Process
1. Créer `builds/<slug>.md` depuis le modèle.
2. Pour chaque pattern utilisé : l'ajouter à `builds:` de sa recette. Un pattern vu dans un deuxième build sans recette : créer la recette, `status: testé`.
3. Ajouter le projet et ses tâches si c'est un nouveau projet (`projects/`, `_shared/repos.md`).
4. Run `python -I _tools/index.py builds knowhow projects` puis `python -I _tools/xref.py`.

## Outputs
- `builds/<slug>.md`, recettes mises à jour, index régénérés.

## Check
`_tools/xref.py` sort sans erreur, et `python -I _tools/links.py` passe.
