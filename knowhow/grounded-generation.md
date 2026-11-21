---
title: Génération ancrée par citations
description: Faire produire un texte par un LLM sans qu'il invente : chaque affirmation pointe vers sa source
status: testé
builds: [lds-harnais-generation, sentra-legal-advisor, manifestation-book-digest, como-prospection-agents]
updated: 2026-11-21
---
# Génération ancrée par citations

`status` = niveau de confiance : testé | emprunté | hypothèse. Recette tirée de la documentation des builds ; à affiner à chaque usage.

## Problème
Un LLM qui rédige ou conseille invente des faits plausibles.

## Recette
1. Restreindre l'agent à un corpus fourni (notes, bibliothèque, livres).
2. Exiger une référence par affirmation (citation, page, URL).
3. Manque d'information → « à compléter », jamais une invention.
4. Un validateur vérifie les références avant de livrer (LDS : validateurs puis réparation ciblée).

## Pièges
- Des citations reformulées qui ne correspondent plus à la source.
- Une règle « jamais inventer » sans validateur qui la contrôle.

## Snippet minimal

## Sources
- [lds-harnais-generation](../builds/lds-harnais-generation.md)
- [sentra-legal-advisor](../builds/sentra-legal-advisor.md)
- [manifestation-book-digest](../builds/manifestation-book-digest.md)
- [como-prospection-agents](../builds/como-prospection-agents.md)
