# 01_wrap - clôturer une session de travail

Un seul job : consigner ce que la conversation a fait, avant qu'elle ne se perde.

## Inputs
- Working : la conversation en cours (ce qui a été fait, décidé, appris).
- Working : `projects/<slug>/tasks.md` du ou des projets touchés.
- Reference : `_templates/session.md`, `_shared/task-format.md`.

Do NOT load : les autres projets, les sessions passées, `builds/` et `knowhow/` sauf si l'étape 4 ci-dessous s'applique.

## Process
1. Lister les tâches touchées par leur ID. Une tâche nouvelle reçoit le prochain ID libre et s'ajoute à `tasks.md`, avec la taille proposée (`#petit` ou rien) ; une tâche commencée passe à `[~]` ; une tâche finie est cochée.
2. Écrire `sessions/AAAA-MM-JJ-HHMM-<préfixe>.md` depuis le modèle : 2 à 5 lignes sous `Fait`, 1 à 3 sous `Suite`. Une fiche par projet touché.
3. Mettre à jour `projects/<slug>/CONTEXT.md` : `Prochaines actions`, `Blocages`, `updated`. Une décision prise : une entrée dans `decisions.md`.
4. Si une automatisation a franchi un cap (créée, passée en prod, abandonnée) : mettre à jour ou créer sa fiche `builds/`. Un résultat business constaté : proposer une leçon pour business-brain, sans l'écrire.
5. Un contact a été échangé : ligne d'historique et `last_contact` dans sa fiche.
6. Run `python -I _tools/index.py projects contacts builds` puis `python -I _tools/xref.py` (qui régénère aussi `projects/_hq.json`, lu par le panneau Work HQ).

## Outputs
- `sessions/<fiche>.md`, et les mises à jour des fichiers ci-dessus.

## Check
Toi : je t'affiche la fiche de session et le diff des tâches ; tu valides ou tu corriges. Rien n'est committé avant.
