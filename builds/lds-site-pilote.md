---
title: Site pilote Lettre de sortie
description: SPA et backend Node.js du MVP : comptes, lien magique par e-mail, journal sans données de santé, simulateur de boucle
status: prototype
project: LDS
repo: El-Rudi-33/Lettre-de-sortie-com
path: /
stack: [node, javascript, vps]
knowhow: [repo-interface-contract]
updated: 2026-11-21
---
# Site pilote Lettre de sortie

`status` : prototype | prod | abandonné. Fiche tirée de la documentation du repo le 2026-11-21, code non relu.

## Ce qu'elle fait
Sert le frontend et l'API ; la boucle de génération est simulée en attendant le branchement de l'orchestrateur. Aucune note ni lettre écrite sur disque.

## Comment la lancer
`npm install` puis `npm run dev` (simulateur accéléré, http://localhost:3000). Sans SMTP, les liens e-mail s'affichent à l'écran.

## Réutilisable
- [`lib/comptes.js`](https://github.com/El-Rudi-33/Lettre-de-sortie-com/blob/main/lib/comptes.js) : comptes JSON + scrypt, sans base de données
- [`lib/journal.js`](https://github.com/El-Rudi-33/Lettre-de-sortie-com/blob/main/lib/journal.js) : journal JSONL sans donnée sensible
- [`contrat-api.md`](https://github.com/El-Rudi-33/Lettre-de-sortie-com/blob/main/contrat-api.md) : contrat frontend ↔ backend ↔ boucle

## Leçons techniques

## Limites
Passages juridiques encore à trancher avec un avocat (README).
