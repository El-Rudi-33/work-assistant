# Les trois cerveaux

| Repo | Rôle | Ce qui y entre |
|---|---|---|
| personal-assistant/Research | entrée | toute source ingérée ; les sources brutes restent dans `Research/raw/` |
| business-brain | quoi vendre, pourquoi | stratégies, régimes, leçons business à résultat constaté |
| work-assistant (ici) | comment construire, ce qui existe | `builds/`, `knowhow/` |

## Flux

- Research → business-brain : ce qui est business (géré par business-brain).
- Research → `knowhow/` : ce qui est technique (agents, outils, automatisations). La recette cite sa source en texte et porte `confidence: emprunté`.
- Projets → `builds/` : chaque automatisation construite.
- Projets → `knowhow/` : un pattern vu dans deux builds ou plus, `confidence: testé`.
- Projets → business-brain `lessons/` : un résultat business constaté, selon le TEMPLATE de ce repo.

## Confiance (même échelle que business-brain)

`testé` (utilisé dans un de mes builds) · `emprunté` (source externe crédible) · `hypothèse`.

## Liens entre repos

URL GitHub complète vers le fichier (`https://github.com/<owner>/<repo>/blob/main/<chemin>`). Jamais de chemin relatif vers un autre repo.
