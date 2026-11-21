---
title: Contrat d'interface entre repos
description: Faire collaborer deux repos (ou deux couches) sans qu'aucun ne lise l'intérieur de l'autre
status: testé
builds: [como-prospection-agents, lds-site-pilote]
updated: 2026-11-21
---
# Contrat d'interface entre repos

`status` = niveau de confiance : testé | emprunté | hypothèse. Recette tirée de la documentation des builds ; à affiner à chaque usage.

## Problème
Deux repos qui se lisent mutuellement deviennent couplés, et un repo partagé fuit vers l'autre.

## Recette
1. Un seul fichier de contrat, source de vérité de l'interface.
2. Des messages datés avec un en-tête fixe (id, de, vers, type, statut).
3. Une boîte d'envoi et une boîte de réception ; personne ne lit les dossiers de l'autre.

## Pièges
- Un contrat qui décrit la stratégie au lieu du format.

## Snippet minimal

## Sources
- [como-prospection-agents](../builds/como-prospection-agents.md)
- [lds-site-pilote](../builds/lds-site-pilote.md)
