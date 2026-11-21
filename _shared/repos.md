# Registre des repos

Seul endroit où un repo est nommé. `_tools/collect.py` lit le premier tableau : garde le format.

| slug | repo | préfixe | partagé | suivi |
|---|---|---|---|---|
| work-assistant | El-Rudi-33/work-assistant | WA | non | non |
| como-marketing | El-Rudi-33/Como_Marketing | COM | oui | oui |
| lettre-de-sortie | El-Rudi-33/lettre-de-sortie | LDS | non | oui |
| lettre-de-sortie | El-Rudi-33/Lettre-de-sortie-com | LDS | non | oui |
| sentra | El-Rudi-33/SENTRA-Research | SEN | non | oui |

- `préfixe` : préfixe des IDs de tâches du projet (`COM-001`).
- `partagé` : oui si quelqu'un d'autre pousse dessus. Le hub n'y écrit jamais rien.
- `suivi` : oui si la routine du soir collecte ses commits.

## Hors périmètre

L'organisation GitHub AllHereGeneva : jamais de ligne ici, jamais de fiche, jamais de description de code.
Les forks scroll-craft et hormozi-gtm : déjà ingérés ailleurs, ignorés.

## Repos de vie (seulement leurs automatisations dans `builds/`)

| repo | ce qu'il est |
|---|---|
| El-Rudi-33/personal-assistant | l'assistant de vie : journal, santé, planning, `Research/` |
| El-Rudi-33/finances | suivi financier personnel |
| El-Rudi-33/Manifestation-Study | étude comparée de livres |

## Repos de connaissance (pas des projets)

| repo | rôle | comment y accéder |
|---|---|---|
| El-Rudi-33/business-brain | quoi vendre, pourquoi | skill `business-advisor` ; attacher le repo seulement pour y écrire une leçon |
| El-Rudi-33/personal-assistant | entrée de tout savoir (`Research/`) | lire `Research/index.md`, puis une page |
| El-Rudi-33/Marketing-Tools | outils marketing repérés et testés | lire `catalogue.md`, puis la fiche de l'outil |
