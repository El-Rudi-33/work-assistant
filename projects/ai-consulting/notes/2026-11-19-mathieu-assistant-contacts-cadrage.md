# Cadrage — assistant contacts pour Mathieu (CREAdvisors)

**Date :** 2026-11-19
**Pour :** le point de 30 min avec Mathieu sur son « assistant agentique pour sa base de contacts »
**Source :** `Research/wiki/projects/ai-automation-business/2026-11-18-mathieu-creadvisors.md` (§1, §3, §5 point 5)
**Statut :** brainstorm, rien n'est décidé. Le but du cadrage est de sortir avec une forme de solution choisie, pas de la choisir avant.

---

## 1. Ce qu'on sait, ce qu'on suppose

**Ce qu'on sait (conversation du 2026-11-18)**
- Mathieu est conseiller immobilier chez CREAdvisors (Genève). Très bon réseau, met facilement les gens en contact, mais ne « capitalise » pas dessus et les gens ne lui renvoient pas l'ascenseur.
- Il utilise Claude.
- Il veut un assistant pour sa base de contacts : remplir et tenir à jour les fiches lui prend du temps. Il saurait le faire lui-même, mais ne le fait pas parce que ça ne rapporte pas d'argent.
- Il a envoyé le lien de Boardy (super-connecteur IA : appel vocal, puis intros en double opt-in).
- Il attend un retour de ses mises en relation, sans dire lequel.
- Thomas lui construit une première version gratuite, sur ses vraies données, contre son temps de test et son avis.

**Ce qu'on suppose (à vérifier au cadrage)**
- On ne sait pas où vivent ses contacts : CRM métier, Excel, carnet iPhone, LinkedIn, Notion, ou plusieurs à la fois. Tout le reste en dépend.
- On ne sait ni le volume ni la part réellement vivante de la base.
- On ne sait pas ce qu'il fait d'un contact : intros entre personnes, mandats immobiliers (acheteurs, vendeurs, propriétaires), vœux et newsletters, ou un mélange.
- Hypothèse forte : « ça ne rapporte pas d'argent » est le vrai signal. La fiche n'a de valeur pour lui que si elle sert à une intro ou à un mandat. Le lien Boardy dit que l'envie profonde est peut-être « savoir qui présenter à qui », pas « avoir des fiches propres ». Si c'est vrai, remplir des fiches n'est qu'une brique.
- Hypothèse : une partie de la base contient des données de clients immobiliers (budget, situation, projet). Ça change tout sur la confidentialité et sur ce qu'on fait passer par un modèle.

---

## 2. Les questions de cadrage

Les questions marquées **[15 min]** sont les huit à poser si on n'a que 15 minutes. Chaque question : pourquoi on la pose, et ce que la réponse change dans la solution.

### A. Son outil et ses données aujourd'hui

1. **[15 min]** Où vivent tes contacts aujourd'hui ? Montre-moi l'écran. (Un ou plusieurs endroits ? Lequel est la référence ?)
   Pourquoi : c'est la question qui fixe l'architecture. Change : CRM avec export/API → pipeline sur export ; carnet iPhone ou Excel → dossier de fiches ; LinkedIn seul → on part de rien de structuré.
2. Combien de contacts, à peu près, et combien tu touches vraiment dans un mois ?
   Pourquoi : distinguer la base morte de la base vivante. Change : si la partie vivante est petite, on la soigne à la main avec l'assistant ; si elle est grande, il faut un traitement en lot.
3. **[15 min]** Montre-moi une fiche que tu trouves bien remplie, et une fiche vide. Qu'est-ce qui manque sur la vide ?
   Pourquoi : définit le « schéma » de la fiche sans théorie. Change : la liste des champs que l'assistant doit remplir, et ceux qui ne valent pas l'effort.
4. Ton outil exporte-t-il (CSV, vCard) et réimporte-t-il ? A-t-il une API ou une intégration ?
   Pourquoi : savoir si on peut lire et écrire sans casser son outil. Change : aller-retour automatique possible, ou export manuel périodique.
5. Qui d'autre touche à cette base (assistante, associé, personne) ?
   Pourquoi : un outil à deux a d'autres contraintes qu'un outil perso. Change : partage, droits, et qui valide ce que l'assistant propose.

### B. Ce qu'il fait d'un contact

6. **[15 min]** La dernière fois que tu as ouvert une fiche, c'était pour faire quoi ?
   Pourquoi : l'usage réel, pas l'usage déclaré. Change : si c'est « retrouver qui est cette personne avant un rendez-vous », on optimise la lecture ; si c'est « trouver à qui présenter quelqu'un », on optimise la recherche croisée.
7. Quand tu mets deux personnes en contact, comment ça te vient ? De tête, en cherchant dans la base, par hasard dans une conversation ?
   Pourquoi : sait-on si la base participe déjà au connecteur ou si tout est dans sa tête. Change : si tout est de tête, la forme « qui présenter à qui » a un vrai espace ; sinon on améliore la recherche existante.
8. La base sert-elle au business immobilier (acheteurs, vendeurs, propriétaires, mandats) ou au réseau en général ? Les deux sont-ils mélangés ?
   Pourquoi : deux populations, deux niveaux de confidentialité, deux usages. Change : séparer ou non les fiches « clients » des fiches « réseau » ; ce qui peut passer par un modèle.
9. Envoies-tu des choses groupées depuis cette base (vœux, newsletter, invitations) ?
   Pourquoi : un usage de masse exige d'autres champs (consentement, segment) et d'autres précautions. Change : on l'écarte de la v1 ou on l'intègre.

### C. D'où viennent les nouvelles infos

10. **[15 min]** Après une rencontre ou un appel, où va l'information ? (Nulle part, mémoire, note sur le téléphone, mail à toi-même, fiche directement ?)
    Pourquoi : c'est là que l'info se perd ou se garde. Change : si la réponse est « nulle part », la forme « note vocale → fiche » est la plus forte ; si c'est « mail à moi-même », on lit ce mail.
11. Par quels canaux arrivent les infos sur tes contacts : LinkedIn, mails, WhatsApp, cartes de visite, agenda, bouche à oreille ?
    Pourquoi : lister les sources possibles d'enrichissement. Change : quelles entrées l'assistant doit savoir lire ; ce qu'on laisse de côté en v1.
12. Comment apprends-tu qu'un contact a changé de poste ou de société ?
    Pourquoi : la mise à jour « passive » (veille) contre la mise à jour « active » (après rencontre). Change : si c'est LinkedIn, on cadre une vérification ponctuelle et manuelle, jamais un scraping de masse.
13. Dictes-tu des notes vocales (WhatsApp, Mémo vocal, autre) ? Le ferais-tu si ça créait la fiche tout seul ?
    Pourquoi : la voix est la seule capture réaliste en déplacement. Change : la forme B (note vocale → fiche) devient centrale ou tombe.

### D. Ce qui lui coûte du temps

14. **[15 min]** Raconte-moi la dernière fois que tu as mis la base à jour : quand, combien de temps, quoi exactement ?
    Pourquoi : la douleur concrète, pas le principe. Change : on vise le geste qui coûte le plus (saisie, recherche d'infos, tri des doublons), pas tout à la fois.
15. Quelle partie tu détestes : saisir, chercher l'info, décider quoi noter, ou retrouver ensuite ?
    Pourquoi : la saisie et la recherche d'info s'automatisent ; « décider quoi noter » se résout par un gabarit. Change : où mettre l'effort.
16. Depuis quand la base n'est pas à jour ? Qu'est-ce que ça t'a coûté (une intro oubliée, un nom perdu, un rendez-vous où tu n'avais rien) ?
    Pourquoi : chiffrer le coût de l'inaction avec ses mots. Change : si rien ne lui a coûté, c'est une envie, pas un besoin (voir §5).

### E. Ce qu'il ferait avec la fiche parfaite

17. **[15 min]** Si demain chaque fiche était à jour, qu'est-ce que tu ferais différemment lundi matin ?
    Pourquoi : la fiche n'est pas une fin. Change : si la réponse est « rien de précis », on s'arrête ou on cherche l'usage ; si c'est « je ferais trois intros par semaine », la forme D (qui présenter à qui) est la cible.
18. Qu'est-ce que la fiche devrait contenir pour que tu la consultes avant chaque rendez-vous ?
    Pourquoi : le test de la fiche utile, c'est qu'il la lit. Change : le gabarit de fiche (dernier échange, ce qu'il cherche, ce qu'il peut offrir, qui je lui ai présenté).
19. Tu veux que l'assistant te propose des choses (qui relancer, qui présenter à qui) ou seulement qu'il remplisse ?
    Pourquoi : remplir est de l'automatisation ; proposer est de l'augmentation, et c'est ce que Boardy vend. Change : v1 passive (fiches) ou v1 avec un rendu hebdo de suggestions.

### F. Contraintes : confidentialité, nLPD, données de clients

20. **[15 min]** Qu'y a-t-il de confidentiel dans la base ? Clients acheteurs ou vendeurs, budgets, situations familiales, adresses privées ?
    Pourquoi : dire ce qu'on ne fait pas passer par un modèle et ce qu'on ne stocke pas. Change : fiches « réseau » (nom, rôle, société, LinkedIn public, notes de rencontre) traitées ; données de clients immobiliers exclues de la v1 ou traitées localement, à décider.
21. Es-tu à l'aise que ces données passent par Claude (donc par les serveurs d'Anthropic) ? CREAdvisors a-t-elle une règle là-dessus ?
    Pourquoi : il utilise déjà Claude, mais pas forcément avec des données de clients. Change : quel compte, quels réglages de conservation, ou traitement local seulement.
22. Tes contacts savent-ils qu'ils sont dans ta base et pourquoi ? (Obligations nLPD d'information et de finalité : à vérifier, ne rien affirmer au cadrage.)
    Pourquoi : enrichir des fiches de personnes à partir de sources publiques reste un traitement de données personnelles. Change : on garde la finalité étroite (gérer son réseau professionnel) et on documente d'où vient chaque info.
23. Tu travailles sur quoi : Mac, PC, iPhone ? Tu accepterais d'installer un outil (Claude Code, un dossier synchronisé), ou il faut que ça tienne dans Claude.ai et ton téléphone ?
    Pourquoi : la forme technique doit coller à sa pratique, pas l'inverse. Change : Claude Code sur un dossier local, ou un flux via téléphone (voix, WhatsApp/Telegram) sans rien installer.

### G. Ce qu'il a déjà essayé avec Claude

24. Qu'est-ce que tu fais avec Claude aujourd'hui ? As-tu déjà essayé pour tes contacts ? Qu'est-ce qui a coincé ?
    Pourquoi : il a dit « je saurais le faire ». Savoir où ça a bloqué (copier-coller, pas de mémoire, pas d'accès à la base) dit ce que l'assistant doit apporter. Change : mémoire persistante, accès aux données, ou simplement un gabarit et une habitude.
25. Qu'est-ce que Boardy t'a donné envie de faire ? Tu l'as essayé ? Qu'est-ce qui t'a plu ou gêné ?
    Pourquoi : comprendre s'il veut l'outil pour lui ou s'il réfléchit à un business de connecteur. Change : v1 personnelle, ou germe d'une offre « apporteur d'affaires outillé » (hors cadrage, à noter).

### H. Comment il saura que ça marche

26. **[15 min]** Dans un mois, qu'est-ce qui te ferait dire « ça marche » ? Et « ça ne sert à rien » ?
    Pourquoi : le critère de succès, dans ses mots, avant de construire. Change : ce qu'on mesure (fiches remplies, temps gagné, intros faites) et quand on arrête.
27. Combien de temps par semaine tu peux donner au test, honnêtement ?
    Pourquoi : la v1 est gratuite contre son temps ; sans temps, pas de retour. Change : la taille de la v1 et le rythme des points.
28. Si ça marche, tu paierais pour ? Tu le montrerais à un confrère ?
    Pourquoi : pas pour vendre, pour mesurer la valeur perçue. Change : rien dans la v1 ; beaucoup dans ce que Thomas en fait ensuite (cas client, offre).

---

## 3. Formes possibles de la solution

À choisir après le cadrage, pas avant. Les quatre sont cumulables ; la v1 n'en prend qu'une.

### A. Dossier de fiches markdown + Claude Code qui enrichit

- **Principe :** une fiche par personne dans un dossier (nom, rôle, société, URL LinkedIn publique, historique des échanges, qui je lui ai présenté, ce qu'il cherche, ce qu'il offre). Claude Code lit le dossier, remplit et met à jour les fiches à partir de ce que Mathieu lui donne (profil LinkedIn collé, mail transféré, note), et répond en langage naturel (« qui connaît quelqu'un dans la santé à Genève ? »).
- **Ce que ça demande de lui :** un export initial de sa base, une heure d'installation, accepter que la référence devienne un dossier de fichiers (ou une synchro avec son outil). Coller lui-même les profils LinkedIn : pas de scraping.
- **Ce que ça livre :** des fiches lisibles, une recherche croisée, une mémoire qui ne dépend plus de sa tête. C'est la version personnelle du « context layer » : des dossiers et du markdown, pas de base exotique.
- **Convient si :** il travaille sur ordinateur, sa base est en Excel, carnet ou éparse, et il accepte d'installer un outil.

### B. Skill « note vocale après une rencontre → fiche »

- **Principe :** après un rendez-vous, Mathieu dicte une minute (WhatsApp, Telegram, Mémo vocal). L'assistant transcrit, identifie la personne, crée ou complète la fiche, et propose une action (« relancer dans deux semaines », « présenter à X »). Il valide.
- **Ce que ça demande de lui :** une seule habitude, dicter après chaque rencontre. Rien à installer sur l'ordinateur si on passe par le téléphone.
- **Ce que ça livre :** la capture au moment où l'info existe, ce qui est exactement ce qui se perd aujourd'hui. Les fiches se remplissent par l'usage, pas par des séances de mise à jour.
- **Convient si :** la réponse à la question 10 est « nulle part » et à la question 13 est « oui ». Se combine naturellement avec A (les fiches vivent dans le dossier).

### C. Pipeline d'enrichissement sur un export CRM

- **Principe :** il exporte sa base (CSV) ; l'agent la nettoie (doublons, champs vides, formats), complète ce qui est public (rôle, société, URL LinkedIn), signale les fiches douteuses ; il relit et réimporte dans son outil.
- **Ce que ça demande de lui :** presque rien, un export et un import de temps en temps. Il garde son outil et ses habitudes.
- **Ce que ça livre :** une base propre, une fois, puis à chaque passage. Pas de nouvelles infos venant de lui : ce que le pipeline ne sait pas, il ne l'invente pas.
- **Convient si :** il a un vrai CRM qu'il veut garder, et que la douleur est le nettoyage, pas la capture. Limite : vérification manuelle des profils, en petit nombre ; pas de collecte automatisée.

### D. Assistant « qui présenter à qui » façon Boardy

- **Principe :** sur des fiches à jour, l'assistant propose chaque semaine des paires (« X cherche un local, Y en libère un »), prépare le message d'intro que Mathieu envoie lui-même, et consigne ce que l'intro a donné. Le retour d'intro devient une donnée, c'est l'ascenseur qu'on ne lui renvoie pas.
- **Ce que ça demande de lui :** des fiches riches (donc A ou B d'abord), ses critères d'intro, et de dire ce que chaque intro a produit.
- **Ce que ça livre :** le levier de connecteur qu'il n'arrive pas à exploiter. C'est la brique qui « rapporte », celle qui justifie à ses yeux de tenir les fiches.
- **Convient si :** la réponse à la question 17 est « je ferais plus d'intros ». Ne tient pas sans A ou B : pas de suggestions sur des fiches vides.

**Lecture :** A ou B pour remplir, D pour que ça rapporte. C si et seulement si il a un vrai CRM qu'il ne veut pas quitter. L'ordre probable est B (ou A) en v1, D en v2 si la base vit.

---

## 4. Ce qu'on ne fait pas

- Pas de scraping LinkedIn automatisé, ni en masse ni en tâche de fond. Les profils sont ouverts et collés par Mathieu, un par un, quand il en a besoin.
- Aucun message envoyé par l'agent : ni intro, ni relance, ni vœux. L'assistant prépare, Mathieu envoie.
- Pas de données personnelles sensibles dans les fiches : pas d'adresse privée, pas de téléphone personnel, pas d'email personnel, pas de situation familiale ou financière. Un contact, c'est nom, rôle, société, URL LinkedIn publique, et les notes de rencontre.
- Pas de données de clients immobiliers (acheteurs, vendeurs, budgets, biens) dans la v1, sauf décision explicite après la question 20, et alors en traitement local.
- Pas de champ sans source : chaque info enrichie porte d'où elle vient (LinkedIn, site, dit par lui le jour J).
- Pas d'outil qu'il doit apprendre. Si la forme choisie lui demande de changer de pratique, c'est la mauvaise forme.
- Pas de promesse de gain ou de chiffre au cadrage. On n'a rien mesuré.

---

## 5. Signaux à écouter : vrai besoin ou envie

**Signes d'un vrai besoin**
- Il raconte un épisode précis où une fiche manquante lui a coûté quelque chose (question 16).
- Il a déjà bricolé une solution : notes dans son téléphone, mails à lui-même, fichier Excel à côté du CRM, Claude avec du copier-coller. Un contournement existant est le meilleur signal.
- Il sait répondre vite à « lundi matin je ferais quoi » (question 17) et la réponse touche à son business (intros, mandats).
- Il consulte déjà ses fiches avant un rendez-vous, même mal remplies.
- Il accepte une contrainte sur lui (dicter après chaque rencontre, relire les propositions) sans négocier.
- Il donne un créneau de test précis plutôt que « quand tu veux ».

**Signes d'une envie**
- Le besoin reste au niveau du principe (« il faudrait que ce soit à jour ») sans épisode concret.
- Il parle de Boardy et de ce que « des gens » font avec l'IA plus que de sa base.
- La réponse à « lundi matin » est « rien de spécial, ce serait propre ».
- Il veut que l'assistant fasse tout sans rien lui demander, y compris envoyer.
- Il n'ouvre pas sa base pendant le cadrage, ou ne retrouve pas où elle est.

**Ce qu'on en fait**
- Besoin : on choisit une forme, on fixe le critère de la question 26, on prend date pour la v1.
- Envie : on ne construit pas de v1. On lui propose un gabarit de fiche et une habitude (B sans outil), et on en reparle au point du 2026-12-02. Rien n'est perdu : l'échange sur les intros et le retour après chaque intro restent.

---

## 6. Déroulé des 30 minutes

| Temps | Quoi | Questions |
|---|---|---|
| 0–3 min | Cadre : « je veux comprendre comment tu travailles avant de construire quoi que ce soit ; montre-moi, ne me décris pas ». Pas de solution avant la 20e minute. | — |
| 3–10 min | Il montre sa base, écran partagé ou téléphone. On regarde une bonne fiche et une vide. | 1, 2, 3, 4 |
| 10–16 min | Le flux réel : la dernière fois qu'il a ouvert une fiche, la dernière fois qu'il en a mis une à jour, où vont les infos après une rencontre. | 6, 10, 14, 11 ou 13 selon ce qu'il dit |
| 16–20 min | La fiche parfaite et le lundi matin. Boardy, ce qu'il a essayé avec Claude. | 17, 19, 24, 25 |
| 20–24 min | Contraintes : confidentiel, clients immobiliers, Claude, son matériel. | 20, 21, 23 |
| 24–28 min | Thomas reformule le besoin en deux phrases, propose une forme (§3) et dit ce qu'on ne fait pas (§4). Mathieu corrige. | 26, 27 |
| 28–30 min | Prochaine étape datée : quel export ou quelle note vocale il envoie, quand Thomas montre la v1, point du 2026-12-02. | — |

**À préparer avant**
- Avoir ce document ouvert et le gabarit de fiche en tête (nom, rôle, société, LinkedIn, dernier échange, cherche, offre, présenté à, source).
- Ne pas montrer de démo. Si le cadrage glisse vers la solution, revenir aux questions.
- Noter ses mots exacts sur la douleur et le critère de succès : ils serviront pour la v1 et, plus tard, pour un cas client s'il donne son accord écrit.

**Après**
- Consigner les réponses dans ce fichier (section « Réponses du cadrage » à ajouter), choisir la forme, écrire le ticket de v1.
- Mettre à jour `Planning/todo.md` (section « Réseau Mathieu ») et `Planning/agenda.md`.
