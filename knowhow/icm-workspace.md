---
title: Espace de travail ICM
description: Un repo où la structure de dossiers orchestre l'agent : une carte, des salles avec leur contrat, des étapes numérotées
status: testé
builds: [como-prospection-agents, sentra-legal-advisor, manifestation-book-digest]
updated: 2026-11-21
---
# Espace de travail ICM

`status` = niveau de confiance : testé | emprunté | hypothèse. Recette tirée de la documentation des builds ; à affiner à chaque usage.

## Problème
Un agent qui lit tout le repo gaspille des tokens et mélange les contextes.

## Recette
1. Un fichier d'entrée court qui route (CLAUDE.md ou AGENTS.md).
2. Un `CONTEXT.md` par salle : entrées, travail, sorties, contrôle.
3. Des dossiers numérotés quand l'ordre compte.
4. Méthode complète : skill `icm-architect` installé dans ce repo.

## Pièges
- Une carte qui finit par porter du contenu : la garder en routage pur.
- Des salles créées avant que le travail existe.

## Snippet minimal

## Sources
- [como-prospection-agents](../builds/como-prospection-agents.md)
- [sentra-legal-advisor](../builds/sentra-legal-advisor.md)
- [manifestation-book-digest](../builds/manifestation-book-digest.md)
