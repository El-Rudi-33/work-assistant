# 02_collect - détecter les commits nouveaux, sans IA

Un seul job : dire, par repo suivi, ce qui a changé depuis le dernier passage, sans lire le code.

## Inputs
- Reference : `_shared/repos.md` (colonne `suivi`), `_shared/collect-ignore.txt` (bruit écarté).
- Working : `cycle/02_collect/state/cursors.json` (dernier commit vu par repo).
- Working : les clones des repos suivis, attachés à la session de routine.

Do NOT load : le contenu des repos, les diffs, tout le reste du hub.

## Process
1. Run `python -I _tools/collect.py --clones /home/user`.
2. Ne rien faire d'autre. Le script écrit tout.

## Outputs
- `output/changes.md` : par repo, les commits (auteur, date, message) et les fichiers touchés.
- `output/pending-cursors.json` : les nouveaux curseurs, appliqués seulement par 03 quand il passe.
- `output/check.md`.

## Check
Le script écrit `check.md` : `pass` s'il y a au moins un commit nouveau, `fail: aucun changement` sinon. `fail` arrête la routine ici : 03 ne tourne pas et rien d'autre n'est lu. Un repo suivi sans clone est signalé dans `changes.md`, sans arrêter les autres.
