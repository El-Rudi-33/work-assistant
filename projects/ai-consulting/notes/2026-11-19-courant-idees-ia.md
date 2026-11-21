# Courant (Marc Renfer) — trois idées d'usage de l'IA pour un média local naissant

**Rédigé le :** 2026-11-19
**Pour :** l'intro de Marc Renfer par Mathieu (voir `Research/wiki/projects/ai-automation-business/2026-11-18-mathieu-creadvisors.md`, §2 ligne 2 et §5 point 4)
**Ce qu'on sait de Courant (presse : watson, 20min, Le Temps ; à confirmer avec Marc) :** média numérique local
d'information générale à Genève, porté par une association à but non lucratif, soutenu par la fondation
We.Publish, lancement visé mars 2027. Marc Renfer : RTS (10 ans), Tribune de Genève (2022-2026), Swiss Press
Award 2026. Petite équipe, budget serré, rédaction qui se construit et peut intégrer l'IA dès le premier jour.

---

## 0. Le cadre, avant les idées

**Ce qu'on ne propose jamais.** L'IA n'écrit pas un article, ne choisit pas un sujet, ne touche pas à la ligne
éditoriale, ne publie rien. La crédibilité d'un média local est son seul capital, et c'est aussi la raison
pour laquelle il résiste à l'IA : l'information locale est un contenu à enjeux, où le lecteur demande des
preuves, pas du texte plausible (`Research/wiki/entrepreneurship/ai-disruption-risk-continuum.md`). Tout
ce qui suit place l'IA en amont (lire, trier, retrouver, préparer) ou en aval (administrer, relancer,
rendre compte), jamais à la place de la plume ni du jugement.

**Le principe qui relie les trois idées.** La valeur ne vient pas du modèle, qui n'est que l'exécutant,
mais des instructions, des dossiers et de la mémoire que la rédaction possède
(`Research/wiki/ai-technology/ai-is-part-of-the-program.md`). Concrètement : des dossiers et des fichiers
texte que l'équipe peut lire, corriger et emporter ailleurs, pas une boîte noire louée
(`Research/wiki/ai-technology/folders-over-agents.md`). Un média qui naît peut poser cette structure dès
le premier jour, là où une rédaction existante doit la reconstruire à grands frais
(`Research/wiki/ai-technology/becoming-ai-adoptive-playbook.md`).

**Le principe qui guide la rencontre.** Montrer plutôt que dire : un prototype sur des données publiques
vaut plus que n'importe quel discours (`Research/wiki/entrepreneurship/proof-over-message.md`).

---

## A. Marketing et audience — « Les coulisses comme moteur de membres »

### Le problème
Un média local vit de ses membres et de ses soutiens, pas de la publicité. Au lancement, l'équipe doit
convaincre des lecteurs de payer pour quelque chose qui n'existe pas encore, tout en construisant le
produit. Le temps passé à écrire la newsletter de lancement, à répondre aux lecteurs, à relancer les
pré-inscrits et à tenir à jour la liste des soutiens est du temps pris sur le journalisme. Et le piège du
marketing assisté par IA, c'est le texte générique que tout le monde reconnaît : ce qui rend un média
local désirable, c'est précisément ce qui n'est pas générique (son équipe, ses choix, sa ville).

### Ce que ça fait concrètement
L'idée est de capter ce que la rédaction fait déjà pour en faire de la matière à membres, sans tournage ni
rédaction supplémentaire (`proof-engine-document-while-you-deliver.md` : « capturer, pas créer »).

- **Entrées :** les notes internes de la rédaction (conférence de rédaction, décisions de couverture, sujets
  refusés et pourquoi, réponses aux lecteurs), les retours des lecteurs (mails, formulaires), la liste des
  pré-inscrits et des membres avec leur statut, et les textes publics déjà existants (interviews de Marc,
  page We.Publish).
- **Traitement :** à partir de ces notes, l'outil propose chaque semaine un brouillon de lettre « coulisses »
  en voix documentaire (« voici ce qu'on a décidé cette semaine et pourquoi »), des réponses types aux
  questions récurrentes des lecteurs, et une liste de relances segmentées (inscrit sans don, donateur
  unique, membre à renouveler) avec un brouillon par segment.
- **Sorties :** brouillons dans un dossier `newsletter/brouillons/`, tableau des membres et de leurs
  étapes (inscrit, donateur, membre, ambassadeur), liste des actions de la semaine.
- **Qui valide :** un humain de l'équipe relit, réécrit et envoie chaque texte. Rien ne part sans lecture.
  Le brouillon n'est qu'un point de départ écrit dans les mots de l'équipe, pas un texte à publier.

Pourquoi la voix documentaire plutôt que le discours : avant la preuve (le média n'est pas encore sorti), le
« voici ce qu'on fait et pourquoi » est incontestable, là où le « voici pourquoi vous devez nous soutenir »
exige une crédibilité qu'on n'a pas encore (`proof-over-message.md`, « how I » contre « how to »). Et ce
qui distingue une lettre d'un média local de la bouillie générique, ce sont les détails que seule cette
équipe peut raconter (`content-tiers-commodity-personality-original.md` : contenu de personnalité contre
contenu commodité ; le « AI slop » n'est que du contenu non attribuable). Pas besoin de viralité : de
l'expertise démontrée, dans la durée, pour un public précis (`hormozi-focus-priorities-qa.md`).

### Ce que ça demande à l'équipe
- Prendre des notes, même brèves, après chaque décision éditoriale : c'est la matière première. Sans notes,
  pas de coulisses, et l'outil n'a rien d'honnête à proposer.
- Une personne responsable des membres (même à temps très partiel) qui relit et envoie.
- Tenir la liste des membres dans un format exportable (CSV ou tableur), pas éparpillée dans des mails.
- Décider dès le début quelles informations on collecte sur un soutien (le minimum : nom, email, statut).

### Premier livrable montrable en 48 h
À partir du matériel public uniquement (interviews de Marc dans la presse, page We.Publish, statuts si
publiés) : trois variantes d'une « lettre n° 0 » en voix documentaire, un gabarit de tableau de suivi des
soutiens par étape, et le dossier qui les a produits (notes d'entrée, instruction, sorties), pour que Marc
voie le mécanisme et pas seulement le résultat. Marqué clairement « brouillon, non validé ».

### Risques et comment on les contient
- **Crédibilité :** une lettre qui sent l'IA abîme la marque avant même le lancement. Règle : le brouillon
  part toujours des mots de l'équipe (notes, citations réelles), un humain réécrit, et chaque lettre porte
  au moins un détail que seule la rédaction pouvait connaître. Mention de transparence dans la charte si
  l'équipe le souhaite.
- **nLPD :** la liste des soutiens est une base de données personnelles. Collecte minimale, consentement
  explicite pour la newsletter, hébergement et outil d'envoi avec contrat de sous-traitance, droit d'accès
  et de suppression prévu dès le premier jour. Aucune donnée de membre n'est envoyée à un service d'IA
  sans pseudonymisation (l'outil travaille sur des identifiants, pas des noms, pour la segmentation).
- **Droits d'auteur :** citer la presse qui parle de Courant se fait en courtes citations sourcées, pas en
  reprise.
- **Dépendance :** tout vit dans des dossiers texte et un CSV ; l'outil d'envoi et le modèle sont
  remplaçables. Si Thomas disparaît, l'équipe garde tout et peut continuer à la main.

### Pages du wiki qui fondent l'idée
`Research/wiki/entrepreneurship/proof-engine-document-while-you-deliver.md`,
`Research/wiki/entrepreneurship/proof-over-message.md`,
`Research/wiki/entrepreneurship/content-tiers-commodity-personality-original.md`,
`Research/wiki/entrepreneurship/hormozi-focus-priorities-qa.md`,
`Research/wiki/entrepreneurship/ai-disruption-risk-continuum.md`.

---

## B. Administration et fonctionnement — « Le secrétariat de l'association »

### Le problème
Une association à but non lucratif qui édite un média cumule une comptabilité, des membres et des
donateurs à suivre, des reçus et attestations à émettre, des factures de pigistes et de prestataires à
traiter, des subventions et des soutiens de fondations à demander puis à justifier (rapports à We.Publish
et à chaque bailleur). Dans une petite équipe, ce travail tombe sur le rédacteur en chef ou sur un
trésorier bénévole. Chaque heure passée là est une heure de journalisme perdue, et une erreur (un reçu
oublié, un rapport en retard) coûte en confiance auprès des bailleurs.

### Ce que ça fait concrètement
Un back-office en dossiers, où l'IA prépare et l'humain décide. C'est le schéma « agent qui suit une
procédure écrite », le plus fiable des schémas d'intégration (`becoming-ai-adoptive-playbook.md`,
« SOP-powered execution agents »).

- **Entrées :** export bancaire (paiements reçus, y compris QR-factures), registre des membres et
  donateurs, statuts et budget de l'association, factures reçues des contributeurs, calendrier des
  échéances (rapports aux bailleurs, AG, cotisations), appels à projets et conditions des fondations.
- **Traitement :**
  1. rapprochement : chaque paiement reçu est proposé en face d'un membre ou d'un don, avec les cas
     douteux mis à part ;
  2. courriers : brouillons de reçus, d'attestations de don, de rappels de cotisation, de confirmations
     aux nouveaux membres ;
  3. contributeurs : suivi des factures de pigistes (reçue, validée, payée) et des contrats de cession de
     droits, avec rappel de ce qui manque ;
  4. bailleurs : pré-remplissage des rapports et dossiers de subvention à partir d'un « dossier de
     référence » (mission, statuts, budget, chiffres d'audience validés), et lecture des appels à projets
     avec une liste des conditions à remplir.
- **Sorties :** un tableau de trésorerie et de membres à jour, des brouillons dans `admin/a-envoyer/`,
  une liste hebdomadaire « à valider par le trésorier ».
- **Qui valide :** le trésorier ou le président valide chaque écriture et chaque envoi. L'outil ne
  comptabilise pas, ne paie pas, n'envoie pas. Il propose.

Ce qu'on vend ici, ce n'est pas de l'IA : ce sont les heures du rédacteur en chef rendues au journalisme
et des rapports rendus à l'heure (`sell-outcomes-not-ai.md`). Et ce qui fera marcher le système, ce
n'est pas le modèle mais la procédure écrite avec ses exceptions : qui signe quoi, quel donateur ne veut
pas de reçu, quelle fondation veut quel format (`operational-context-gap.md` ; `ai-is-part-of-the-program.md` :
emprunter la plomberie, posséder le pourquoi).

### Ce que ça demande à l'équipe
- Un trésorier identifié, et une heure d'entretien pour écrire la procédure réelle, exceptions comprises.
- Un registre des membres et donateurs tenu dans un seul fichier.
- Les documents de référence rassemblés une fois (statuts, budget, convention We.Publish, modèles de
  reçus).
- Accepter que l'outil propose et qu'un humain clique : pas d'automatisation de bout en bout sur l'argent.

### Premier livrable montrable en 48 h
Une démonstration sur données fictives : un dossier avec une vingtaine de membres inventés, un faux export
bancaire, les statuts types d'une association genevoise, et le résultat complet du cycle (rapprochement
proposé, reçus en brouillon, liste des paiements non identifiés, ébauche de rapport annuel à un bailleur).
Aucune donnée réelle de Courant n'est nécessaire pour montrer que ça marche. Si Marc partage le gabarit de
rapport attendu par We.Publish, le pré-remplissage se montre sur ce gabarit.

### Risques et comment on les contient
- **nLPD :** la liste des donateurs d'un média est une donnée sensible dans les faits (soutenir un journal
  dit quelque chose de la personne). Hébergement en Suisse ou en Europe, accès restreint au trésorier,
  pseudonymisation avant tout traitement par un service d'IA externe (le modèle voit « membre 0412 », pas
  un nom), durée de conservation définie, registre des traitements tenu. Pas d'adresse ni de téléphone
  stockés au-delà du nécessaire.
- **Crédibilité :** une erreur de reçu ou d'attestation fiscale touche le donateur directement. D'où la
  validation humaine systématique et la mise à part des cas douteux plutôt qu'une décision automatique.
- **Droits d'auteur :** le suivi des contrats de cession avec les pigistes protège Courant (savoir ce qu'on a
  le droit de republier, où et combien de temps). L'outil ne rédige pas les contrats, il suit ce qui est
  signé.
- **Dépendance :** tout est en fichiers ouverts (CSV, texte, PDF) dans les dossiers de l'association. La
  procédure écrite est lisible par un humain et exécutable à la main si l'outil disparaît. Pas de SaaS
  propriétaire qui garde la mémoire.

### Pages du wiki qui fondent l'idée
`Research/wiki/ai-technology/folders-over-agents.md`,
`Research/wiki/ai-technology/ai-is-part-of-the-program.md`,
`Research/wiki/ai-technology/becoming-ai-adoptive-playbook.md`,
`Research/wiki/entrepreneurship/operational-context-gap.md`,
`Research/wiki/entrepreneurship/sell-outcomes-not-ai.md`.

---

## C. Rédaction, côté outillage — « La veille des institutions et la mémoire de la rédaction »

### Pourquoi ce volet
C'est le volet où un média local naissant peut être meilleur que les grands dès le premier jour, et le
seul des trois qui touche au métier sans toucher à l'écriture. L'information locale se trouve dans des
documents publics que personne n'a le temps de lire en entier : ordres du jour et procès-verbaux du Grand
Conseil, des conseils municipaux des communes genevoises, Feuille d'avis officielle, communiqués des
administrations, séances publiques enregistrées. Une rédaction de quelques personnes ne peut pas les
dépouiller. Et une rédaction qui naît n'a pas de mémoire : personne ne se souvient de ce qu'un conseil
municipal a voté il y a dix-huit mois, parce que le média n'existait pas.

### Ce que ça fait concrètement
Le cycle « capter, trier, ranger, utiliser, nourrir » du cerveau d'entreprise, appliqué à une rédaction
(`context-layer-company-brain.md`). L'IA lit ; le journaliste choisit, vérifie et écrit.

- **Entrées :** les documents publiés par les institutions (ordres du jour, PV, décisions, communiqués,
  FAO), récupérés à intervalle régulier ; les enregistrements audio ou vidéo des séances publiques ; et, à
  mesure que la rédaction travaille, ses propres notes (qui a été appelé, ce qui a été vérifié, ce qui
  reste ouvert).
- **Traitement :**
  1. veille : pour chaque nouveau document, extraction des objets traités, des votes, des montants, des
     délais, et des noms des élus intervenant dans leur fonction, chaque élément lié au paragraphe source,
     cité verbatim ;
  2. note quotidienne : une page « ce qui est sorti hier » classée par commune et par thème, avec pour
     chaque point l'extrait et le lien, et une rubrique « à suivre » (objets renvoyés en commission,
     décisions annoncées pour plus tard) ;
  3. transcription des séances publiques enregistrées, horodatée, pour retrouver un passage sans réécouter
     deux heures ;
  4. mémoire : chaque note de veille, chaque transcription et chaque note de la rédaction est rangée dans
     des dossiers par commune et par thème, en fichiers texte. Plus tard, la question « qu'a dit le conseil
     municipal de telle commune sur tel sujet depuis le lancement » obtient une réponse avec les extraits et
     les liens, jamais une réponse sans source.
- **Sorties :** la note de veille quotidienne, les transcriptions, et l'arborescence `memoire/<commune>/`,
  `memoire/<theme>/` que la rédaction lit et complète.
- **Qui valide :** le rédacteur en chef décide de ce qui mérite une enquête ; le journaliste relit chaque
  fait à la source avant de l'utiliser (l'outil lui donne l'extrait et le lien pour que ça prenne une
  minute). L'outil ne propose pas d'angle, ne hiérarchise pas l'actualité, ne rédige rien de publiable.

C'est la place du journaliste dans la pile qui fait la valeur : la machine lit en volume, l'humain fait ce
qu'il est seul à faire, juger et raconter (`augmentation-over-automation.md` : trouver où l'humain se place
est l'avantage, pas l'automatisation elle-même). Et la mémoire vaut plus que la veille : les PV lus, les
transcriptions, les traces du travail (« on a appelé X, il a refusé de répondre ») deviennent un actif que
personne d'autre à Genève ne possède (`context-layer-company-brain.md` : les traces sont du contexte de
premier rang ; les transcriptions exploitées battent les documents maintenus à la main).

### Ce que ça demande à l'équipe
- Une personne « bibliothécaire », même une heure par semaine, qui range, corrige et jette : sans
  curation, la mémoire pourrit en quelques mois (`becoming-ai-adoptive-playbook.md`, « no curation owner »).
- Commencer étroit : une institution et deux ou trois communes, pas les quarante-cinq d'un coup
  (`becoming-ai-adoptive-playbook.md`, « index-everything syndrome »).
- La discipline de noter : un appel, une vérification, un refus de répondre, c'est une ligne dans la
  mémoire. Ce qui n'est pas écrit n'existe pas pour l'outil.
- Une charte interne d'une page : ce que l'outil fait, ce qu'il ne fait pas, et la règle « aucun fait
  issu de l'outil n'est publié sans relecture à la source ».

### Premier livrable montrable en 48 h
Prendre les derniers documents publiés par le Grand Conseil et par un ou deux conseils municipaux
(publics, accessibles sans accord de personne), faire tourner la chaîne, et apporter : une note de veille
d'une page avec extraits et liens, l'arborescence de mémoire qui en résulte, et la question posée à la
mémoire avec sa réponse sourcée. Si une séance publique récente est enregistrée en ligne, ajouter sa
transcription horodatée. Marc, qui a couvert Genève pendant des années, verra en une minute si la note
rate quelque chose ou en trouve.

### Risques et comment on les contient
- **Crédibilité (le risque principal) :** un fait inventé par le modèle qui passerait dans un article. Règle
  absolue : aucun élément sans extrait verbatim et lien vers la source ; un résumé sans source est
  rejeté par la chaîne elle-même ; relecture à la source avant usage. L'outil n'est jamais cité comme
  source. Mention dans la charte éditoriale publique si l'équipe le souhaite : la transparence est un
  argument auprès des membres, pas une faiblesse.
- **nLPD :** les élus et fonctionnaires sont traités dans l'exercice de leur fonction publique, à partir de
  documents déjà publics. Pas de fiches sur des personnes privées citées dans les PV, pas de croisement de
  sources pour profiler quelqu'un ; la mémoire est rangée par institution et par thème, pas par individu.
  Les notes internes de la rédaction (sources, contacts) restent sur une infrastructure contrôlée par la
  rédaction et ne sont pas envoyées à un service externe : protection des sources avant tout.
- **Droits d'auteur :** les actes officiels (lois, décisions, procès-verbaux et rapports des autorités) ne
  sont pas protégés par le droit d'auteur suisse (art. 5 LDA, à faire confirmer par un juriste). En
  revanche, les articles des autres médias le sont : la mémoire ne les ingère pas, elle garde au plus un
  lien et une courte citation sourcée.
- **Dépendance :** fichiers texte, dossiers, scripts lisibles. Le modèle d'IA est remplaçable ; la mémoire
  appartient à Courant et se lit sans aucun outil.

### Pages du wiki qui fondent l'idée
`Research/wiki/ai-technology/context-layer-company-brain.md`,
`Research/wiki/ai-technology/augmentation-over-automation.md`,
`Research/wiki/ai-technology/becoming-ai-adoptive-playbook.md`,
`Research/wiki/ai-technology/folders-over-agents.md`,
`Research/wiki/entrepreneurship/operational-context-gap.md`.

---

## Ordre de priorité proposé

C d'abord (c'est le métier, c'est sur données publiques, c'est ce qui donne envie à un journaliste), B
ensuite (c'est là que les heures se perdent et que le trésorier dit oui vite), A en troisième (il faut des
notes de rédaction et un lancement proche pour que les coulisses aient de la matière). Une chose à la
fois, un flux, un indicateur, puis le suivant (`hormozi-focus-priorities-qa.md` : des priorités, pas plus
d'information).

---

## Questions à poser à Marc Renfer au premier échange

1. Comment imaginez-vous la journée d'un journaliste de Courant en mars 2027 : combien de personnes, qui
   lit quoi le matin, quelles communes et institutions sont couvertes en priorité ?
2. Qu'est-ce qui vous manquait le plus à la Tribune de Genève et à la RTS, côté outils, pour faire du
   local correctement ?
3. Qui tient l'administration de l'association aujourd'hui (membres, dons, comptabilité, rapports à
   We.Publish), et combien de temps cela prend déjà ?
4. Quel est le modèle de soutien visé : membres, dons, abonnements, mélange ? Qu'attend We.Publish en
   retour, et sous quelle forme ?
5. Y a-t-il une charte éditoriale, ou une position sur l'IA, déjà écrite ou en cours ? Que voulez-vous
   pouvoir dire publiquement à vos lecteurs sur l'usage de l'IA à Courant ?
6. Comment la rédaction compte-t-elle protéger ses sources et ses notes internes (où sont-elles stockées,
   qui y accède) ? C'est la contrainte qui dessine tout le reste.
7. Quels documents publics genevois sont les plus sous-exploités par la presse locale aujourd'hui, selon
   vous ?
8. Qui décide à Courant de ce qu'on teste et de ce qu'on adopte : vous seul, un comité de l'association,
   la rédaction ?
9. Si je vous apportais dans deux jours une note de veille sur les derniers PV, qu'est-ce qui vous ferait
   dire « c'est utile » ou « c'est à côté » ?
10. Comment voyez-vous une collaboration avec un indépendant : un coup de main de lancement, un
    accompagnement régulier, un pilote avec un budget défini ? Qu'est-ce qui serait juste pour vous ?

(Ne pas demander de données, de listes ni d'accès au premier échange. Écouter, noter, revenir avec une
preuve.)

---

## Ce que Thomas devrait montrer plutôt que dire à la première rencontre

- **La note de veille réelle (idée C, livrable 48 h)** : une page sur les derniers PV du Grand Conseil et
  d'un ou deux conseils municipaux, avec extraits et liens, posée sur la table. C'est la preuve la plus
  forte : données publiques, pas de consentement à obtenir, et Marc peut juger en une minute avec son
  propre métier (`proof-over-message.md`, `permissionless-work-outreach.md` : faire le travail d'abord,
  puis l'envoyer).
- **Le dossier qui l'a produite**, ouvert sur l'écran : les fichiers d'entrée, l'instruction, la mémoire
  qui se remplit. Montrer que c'est lisible, modifiable et emportable, pas une boîte noire
  (`folders-over-agents.md`).
- **Sa propre mémoire de travail** comme preuve qu'il vit ce qu'il propose : la structure de son wiki de
  recherche et de son assistant (l'arborescence, pas le contenu personnel), en voix documentaire :
  « voici comment je l'ai fait pour moi ».
- **Ne pas montrer** : des slides, un catalogue d'outils, un chiffre de gain de temps non mesuré, un texte
  d'article produit par IA, même « pour voir ».
- **Dire en une phrase, et s'y tenir** : l'IA lit, range, prépare et relance ; les journalistes choisissent,
  vérifient, écrivent et publient. Le reste se démontre.

---

## À garder en tête

- Tout ce qui est dit de Courant ici vient de la presse ; à confirmer de la bouche de Marc avant toute
  proposition écrite.
- Ce contact est hors cible du plan de marche de Como_Marketing (négoce et shipping). Il relève du
  consulting IA au nom de Thomas, ou d'un premier client visible. La tension est notée dans
  `Research/wiki/projects/ai-automation-business/2026-11-18-mathieu-creadvisors.md` §6 et reste à trancher avec Jonas.
- Retour à Mathieu après la rencontre : ce qui s'est dit, ce qui en sort. C'est l'ascenseur promis.
