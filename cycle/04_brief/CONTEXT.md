# 04_brief - proposer la journée

Un seul job : un plan du jour court, et les rappels posés dans l'agenda.

## Inputs
- Working : le dernier fichier de `../03_digest/output/`.
- Reference : `projects/_index.md`, `contacts/_index.md`.
- Working : les tâches avec `⏰` échue ou du jour, par `grep -rn "⏰" projects/*/tasks.md`.
- Working : le calendrier Google « Travail » et le calendrier personnel, en lecture, pour aujourd'hui.
- Reference : `_shared/calendar-rules.md`.

Do NOT load : les fiches complètes des projets, les sessions, `builds/`, `knowhow/`, les repos projets.

## Process
1. Écrire `output/AAAA-MM-JJ.md` : rendez-vous du jour, 3 priorités maximum (par ID de tâche), relances de contacts échues, projets sans activité depuis plus de 7 jours.
2. Poser dans le calendrier « Travail » les échéances et relances du jour, selon `_shared/calendar-rules.md`, avec la ligne « Focus du jour ».
3. Maximum 20 lignes.

## Outputs
- `output/AAAA-MM-JJ.md`, et les événements du calendrier « Travail ».

## Check
Toi : tu lis le brief et tu changes les priorités si besoin. Les événements créés sont listés en bas du brief.
