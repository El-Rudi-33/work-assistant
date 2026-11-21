---
title: Tri des branches du 2026-11-21
description: Ce qui a été fusionné dans main, ce qui reste à arbitrer, ce que Thomas peut supprimer
status: open
updated: 2026-11-21
---
# Tri des branches du 2026-11-21 (WA-009)

## À faire par Thomas

- [ ] Activer « Automatically delete head branches » (Settings > General > Pull Requests) sur chaque repo :
  [personal-assistant](https://github.com/El-Rudi-33/personal-assistant/settings) ·
  [work-assistant](https://github.com/El-Rudi-33/work-assistant/settings) ·
  [business-brain](https://github.com/El-Rudi-33/business-brain/settings) ·
  [Como_Marketing](https://github.com/El-Rudi-33/Como_Marketing/settings) ·
  [lettre-de-sortie](https://github.com/El-Rudi-33/lettre-de-sortie/settings) ·
  [Lettre-de-sortie-com](https://github.com/El-Rudi-33/Lettre-de-sortie-com/settings) ·
  [SENTRA-Research](https://github.com/El-Rudi-33/SENTRA-Research/settings) ·
  [finances](https://github.com/El-Rudi-33/finances/settings) ·
  [Marketing-Tools](https://github.com/El-Rudi-33/Marketing-Tools/settings) ·
  [Manifestation-Study](https://github.com/El-Rudi-33/Manifestation-Study/settings)
- [ ] Régler `main` comme branche par défaut (Settings > General > Default branch) sur work-assistant et business-brain.
- [ ] Supprimer les branches listées en bas de ce fichier.
- [ ] Como_Marketing : voir avec Jonas les 8 branches non fusionnées.

Ce réglage ne supprime une branche que lorsqu'une PR est fusionnée, pas lors d'une fusion directe sur `main`. Le rapport nocturne (`cycle/02_collect/state/branches.md`) signale le reste.

Méthode : chaque branche comparée à `main`. Fusion `--no-ff` des branches solo sans conflit. Pour les journaux en ajout seul (`*_log.md`, `PROGRESS.md`, `log.md`, les index), les lignes des deux côtés sont gardées. Exclusions : les branches actives depuis moins de 48 h, Como_Marketing (repo partagé) et lettre-de-sortie (règle des deux branches).

## Fusionné dans main

- **personal-assistant** : 30 branche(s)
- **business-brain** : 1 branche(s)
- **SENTRA-Research** : 15 branche(s)
- **finances** : 2 branche(s)
- **work-assistant** : `main` créée depuis `claude/lucid-cerf-zmzgs6`.
- **business-brain** : `main` créée depuis l'ancienne branche par défaut `claude/personal-business-marketing-repos-gq6gws`.
- **Lettre-de-sortie-com, Marketing-Tools, Manifestation-Study** : seulement la règle de branches.

La fusion par union peut laisser des lignes en double ou dans le désordre dans les journaux et les index. À nettoyer à la prochaine session du repo concerné.

## Reste à arbitrer

- personal-assistant · `claude/personal-assistant-cleanup-2ez0bt` · conflit : Business/commodities-ai-agency/2026-08-28-comparaison-negoce-vs-fret.md, Business/commodities-ai-agency/2026-08-28-research-marche-fret-geneve.md
- personal-assistant · `claude/commodities-phase2-enrichment-wftlor` · conflit : Research/wiki/projects/commodities-ai-agency/status.md
- personal-assistant · `claude/fret-traders-geneve-context-6x3teu` · conflit : Research/wiki/projects/commodities-ai-agency/status.md
- personal-assistant · `claude/personal-business-marketing-repos-gq6gws` · conflit : Research/wiki/entrepreneurship/ai-era-startup-idea-qualities.md, Research/wiki/entrepreneurship/ai-leverage-amplification.md, Research/wiki/entrepreneurship/custom-ai-studio.md, Research/wiki/entrepreneurship/first-10-customers-playbook.md
- personal-assistant · `claude/email-classification-mockup-3lvgmj` · conflit : projects/maison-du-sourire/installation/compte-rendu-tests.md
- personal-assistant · `claude/manifestation-book-study-videos-y32cli` · conflit : Research/wiki/projects/manifestation-book-study/status.md
- personal-assistant · `ccr-5153a30b-zr8m5z` · activité récente (< 48 h)
- personal-assistant · `ccr-88732091-iabzld` · activité récente (< 48 h)
- personal-assistant · `claude/compassionate-fermi-xlb9ue` · activité récente (< 48 h)
- personal-assistant · `claude/mathieu-networking-ai-consulting-50we9y` · activité récente (< 48 h)
- business-brain · `claude/beautiful-faraday-a5taco` · conflit : state.md, strategies/_tags.md
- business-brain · `ccr-f9182d54-8yt652` · conflit : state.md
- SENTRA-Research · `ccr-7670918f-s7e2uk` · conflit : 00_brief/OPEN_QUESTIONS.md
- finances · `ccr-95510d43-5kielj` · activité récente (< 48 h)
- lettre-de-sortie · `avis-medecin-01` · historique trop court · à fusionner dans `agentic-loop-dev`, selon la règle du repo
- lettre-de-sortie · `claude/eager-bell-w45zvo` · unique, fusion propre · à fusionner dans `agentic-loop-dev`, selon la règle du repo
- lettre-de-sortie · `claude/infomaniak-models-brief-pe5ru9` · unique, fusion propre · à fusionner dans `agentic-loop-dev`, selon la règle du repo
- lettre-de-sortie · `claude/qwen-pipeline-prompts-improvement-f8zrgd` · unique, fusion propre · à fusionner dans `agentic-loop-dev`, selon la règle du repo
- Como_Marketing · `ccr-648ccb7d-va9bb0` · travail non fusionné · à passer en PR avec Jonas
- Como_Marketing · `ccr-a41defae-m78t1g` · travail non fusionné · à passer en PR avec Jonas
- Como_Marketing · `ccr-d489c53f-kel1xq` · travail non fusionné · à passer en PR avec Jonas
- Como_Marketing · `claude/ecstatic-brahmagupta-5ci9nk` · travail non fusionné · à passer en PR avec Jonas
- Como_Marketing · `claude/great-dijkstra-uvo6o2` · travail non fusionné · à passer en PR avec Jonas
- Como_Marketing · `claude/happy-volta-jp2qiq` · travail non fusionné · à passer en PR avec Jonas
- Como_Marketing · `claude/mathieu-networking-ai-consulting-50we9y` · travail non fusionné · à passer en PR avec Jonas
- Como_Marketing · `claude/optimistic-ramanujan-pfn0mn` · travail non fusionné · à passer en PR avec Jonas

## À supprimer (déjà dans main)

Une session cloud ne peut pas supprimer de branche. Depuis ton ordinateur, dans un clone de chaque repo, ou sur la page Branches de chaque repo dans GitHub :

**personal-assistant** (32)

```bash
git push origin --delete claude/lucid-cerf-zmzgs6 claude/video-advice-extraction-k8pn6n claude/brokers-ai-automation-rundjn claude/icm-personal-finance-context-l5n49l claude/astrology-financial-markets-32we15 claude/transfert-harnais-site-web claude/session-iqqa86 claude/ai-skills-exploration-1vuakg claude/book-summary-chapters-1-2-xklc2l claude/reinventer-pratique-sportive-dljdgu claude/geneve-functional-training-gzp5x9 claude/dossiers-dentaires-janice-qr2hcc claude/nouveaux-reves-juillet-us283x claude/email-automation-icm-outline-wclhv4 claude/video-explanation-agents-w0zema claude/airsoft-dream-geneva-lake-llz5r2 ccr-24cbff7d-6rr0mo ccr-4fc71f72-64wbns claude/beautiful-faraday-a5taco claude/lundi-bouffe-ia-1ebrce ccr-6f191602-2hasfs ccr-7670918f-s7e2uk ccr-9536e39e-wqawxg claude/admiring-archimedes-7fjccu claude/gracious-allen-kfeniv ccr-2994408f-mt0hsp ccr-497432f0-qlrr9m claude/personal-journal-reflection-hn54qj ccr-2370ba66-i8lepl ccr-6c0ac5e8-t74994 ccr-41895f30-z1udb5 ccr-beacfdda-imnzs0
```

**business-brain** (2)

```bash
git push origin --delete ccr-24cbff7d-6rr0mo claude/personal-business-marketing-repos-gq6gws
```

D'abord régler `main` comme branche par défaut de business-brain.

**SENTRA-Research** (15)

```bash
git push origin --delete claude/llm-technical-guide-eqdamz claude/aides-juridiques-project-eis4ln claude/llm-citations-hallucinations-3wc3c7 claude/swiss-ai-models-exploration-1yhjgr claude/extractive-fidelity-swiss-hosting-ii3o86 claude/suisse-romande-stakeholders-120c64 ccr-7b2a738c-l8czmd claude/jolly-edison-roo1pl claude/medident-november-release-mcgdoe ccr-e94cade5-hsrbr9 ccr-b9999279-sw5les claude/ia-medecine-donnees-suisse-49g5tg claude/email-classification-mockup-3lvgmj ccr-f8fcea11-bz5iwh ccr-bbada4cd-extxze
```

**finances** (2)

```bash
git push origin --delete claude/analyze-2026-transactions-p69h6f claude/lucid-cerf-zmzgs6
```

**Como_Marketing** (16)

```bash
git push origin --delete ccr-88732091-iabzld claude/intelligent-babbage-02phvl claude/personal-business-marketing-repos-gq6gws claude/playlist-video-ingest-index-k3w6rd claude/repo-previous-folder-8yprng claude/research-como-integration-company-aqclrd claude/strategy-repo-redesign-uh1xd6 claude/video-explanation-agents-w0zema claude/youthful-hamilton-dr4bej thomas/carnet-de-vol thomas/consolidation-branches thomas/decisions-2026-10-02 thomas/lot-a thomas/lot-b thomas/lot-c thomas/lot-d
```

**Lettre-de-sortie-com** (3)

```bash
git push origin --delete claude/audit-boucle-agentique-gm5kf1 claude/harness-transfer-plan-adapt-kd2yvu claude/website-redesign-skill-5ettj2
```

**work-assistant** : `git push origin --delete claude/lucid-cerf-zmzgs6`, après avoir réglé `main` comme branche par défaut.

