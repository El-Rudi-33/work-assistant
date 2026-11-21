---
name: hq
description: Afficher le dashboard Work HQ en texte — agenda du jour, rappels, projets et tâches en cours. Utiliser quand l'utilisateur tape "/hq" ou "/hq tout", ou demande "le dashboard", "mes rappels", "où j'en suis". Marche partout, y compris sur le téléphone où le panneau du mod ne s'affiche pas.
---

Depuis la racine du repo work-assistant, sans lire aucune autre fiche :

1. Lis les événements d'aujourd'hui avec le connecteur Google Calendar : `list_calendars`, prends le calendrier nommé « Travail » s'il existe, sinon le principal ; puis `list_events` de 00:00 à 00:00 le lendemain, `orderBy: startTime`. Écris-les dans le scratchpad en JSON `[{"time": "HH:MM" ou "journée", "title": "..."}]`. Connecteur indisponible : saute l'étape.
2. Lance `python -I _tools/hq.py --agenda <ce fichier>` (sans `--agenda` si l'étape 1 a sauté), avec `tout` en plus si l'utilisateur a écrit `/hq tout`.
3. Recopie la sortie telle quelle dans un bloc de code, sans commentaire. Si le calendrier principal a servi, ajoute une ligne : « calendrier principal (« Travail » pas encore créé, WA-005) ».
