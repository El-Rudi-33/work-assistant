# knowhow - une recette par pattern technique

Copie de `_templates/knowhow.md`, nommée `<slug>.md`. Le `status` est le niveau de confiance (`_shared/knowledge-sources.md`).

- Une recette `testé` naît quand un pattern apparaît dans deux builds ou plus. Avant, l'info reste dans la fiche du build.
- Une recette `emprunté` vient d'une source externe ingérée dans `personal-assistant/Research` : la source brute reste là-bas, la recette la cite en texte.
- `builds:` liste les builds qui l'utilisent ; `_tools/xref.py` vérifie que chaque build qui cite le pattern y figure.
- Index : `python -I _tools/index.py knowhow`.
