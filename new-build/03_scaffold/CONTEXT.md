# 03_scaffold - copier et adapter le réutilisable

Un seul job : poser le premier squelette dans le repo d'accueil.

## Inputs
- Working : `../02_spec/output/<slug>/spec.md`.
- Working : les repos sources de la section `Réutilise`, attachés maintenant, et le repo d'accueil.

Do NOT load : les parties des repos sources que la spec ne cite pas.

## Process
1. Copier les fichiers listés dans le repo d'accueil, en notant leur origine en commentaire d'en-tête (repo + chemin).
2. Adapter selon la spec. Le travail continue ensuite dans le repo d'accueil, en sessions normales.
3. Ce travail se fait dans le repo d'accueil, jamais dans un repo source.

## Outputs
- Le squelette dans le repo d'accueil (branche de travail), et `output/<slug>/scaffold.md` : ce qui a été copié, d'où, ce qui a été adapté.

## Check
Toi, ou un test : le squelette se lance ou ses tests passent. Le résultat va dans `output/<slug>/check.md`.
