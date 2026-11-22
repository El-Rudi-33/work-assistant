---
name: handoff
description: Confier une tâche à une nouvelle conversation, avec le contexte de la conversation actuelle — écrit la fiche de handoff puis ouvre la session qui la reprend. Utiliser quand l'utilisateur tape "/handoff", appuie sur le bouton Handoff du panneau Work HQ, ou dit "passe ça à une autre conversation", "fais un handoff", "ouvre une nouvelle session pour ça".
---

Depuis la racine du repo work-assistant. La description de la tâche est le texte après `/handoff` ; s'il n'y en a pas, demande « Quelle tâche je confie ? » et arrête-toi là.

1. **Projet et repo.** Déduis de la conversation le projet (`projects/<slug>/`) et le repo où le travail se fera (`_shared/repos.md`). Doute : demande, en une question. Jamais un repo de l'organisation AllHereGeneva.
2. **Tâche.** Si la tâche correspond à une tâche existante de `projects/<slug>/tasks.md`, cite son ID. Sinon, ajoute-la en `[ ]` au format de `_shared/task-format.md` (nouvel ID, taille proposée).
3. **Fiche.** Copie `_templates/handoff.md` en `projects/<slug>/handoff-<sujet-court>.md`. Remplis-la avec ce que la conversation actuelle sait et que la suivante ne pourrait pas retrouver seule : décisions, fichiers touchés, ce qui a été essayé ou écarté, pièges. Pas de copie de fiches existantes : cite leur chemin. `from:` = le lien de cette conversation (`get_session`, sans argument).
4. **Commit et push** de la fiche (et de `tasks.md`) sur la branche courante.
5. **Nouvelle conversation.** `create_session` (serveur claude-code-remote) :
   - `title` : `<PRÉFIXE> · <sujet court>` ;
   - `source_url` : `https://github.com/<repo du travail>` ; si c'est le hub, `source_revision` = la branche courante, pour que la fiche y soit ;
   - `prompt` : « Handoff depuis une autre conversation. » puis le texte complet de la fiche (la session peut ne pas avoir le hub), puis « La fiche est aussi dans work-assistant : `projects/<slug>/handoff-<sujet>.md`. Commence par "Par où commencer". Réponses en français, directes. ».
6. Mets `to:` dans la fiche, commit et push. Réponds avec le lien `https://claude.ai/code/<session_id>` et la fiche, rien d'autre.

`create_session` absent (session locale, pas cloud) : fais 1 à 4, puis donne le prompt de l'étape 5 dans un bloc de code, à coller dans une nouvelle conversation.
