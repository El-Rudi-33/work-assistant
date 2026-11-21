# projects - un dossier par projet

Chaque projet est une copie de `_templates/project/` : `CONTEXT.md` (statut, but, jalons), `tasks.md`, `decisions.md`.

- Nouveau projet : copier le modèle dans `projects/<slug>/`, ajouter la ligne dans `_shared/repos.md`, puis `python -I _tools/index.py projects`.
- Cycle de vie : `exploring → building → paused → done`, dans le frontmatter du `CONTEXT.md` du projet.
- Pour l'état de tous les projets, lire `_index.md` (généré), pas les dossiers.
- Ne jamais décrire ici le code d'un repo hors périmètre (`_shared/repos.md`).
