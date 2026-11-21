# 03_digest - résumer la journée

Un seul job : transformer les commits et les sessions du jour en un digest court.

## Inputs
- Working : `../02_collect/output/changes.md` et son `check.md` (doit être `pass`).
- Working : `sessions/` filtré sur les fiches du jour (préfixe de date).
- Reference : `projects/_index.md`.

Do NOT load : les repos projets. Un diff n'est ouvert que si un message de commit est illisible, et seulement ce commit.

## Process
1. Si `../02_collect/output/check.md` n'est pas `pass`, s'arrêter.
2. Par projet : ce qui a avancé (sessions + commits), qui l'a fait (les commits d'autres auteurs sont attribués nommément), ce qui reste bloqué.
3. Les commits sans session de wrap correspondante : les lister à part, « fait hors session ».
4. Maximum 25 lignes au total.
5. Run `python -I _tools/collect.py --advance` pour appliquer les curseurs.

## Outputs
- `output/AAAA-MM-JJ.md`.

## Check
Le script `--advance` écrit `output/check.md` (`pass` si les curseurs sont appliqués). Toi : tu lis le digest au brief du matin.
