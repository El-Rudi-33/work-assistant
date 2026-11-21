# cycle - le pipeline quotidien

Le flux en une ligne : je clôture chaque session, le soir le hub résume ce qui a bougé, le matin il propose la journée.

| Étape | Job | Quand |
|---|---|---|
| `01_wrap` | clôturer une session de travail | fin de chaque session (`/wrap`) |
| `02_collect` | détecter les commits nouveaux, sans IA | routine du soir |
| `03_digest` | résumer la journée | routine du soir, si 02 passe |
| `04_brief` | proposer la journée | routine du matin |

Le principe anti-gaspillage : aucune étape ne lit un repo projet. 02 est un script ; 03 lit ses sorties et les sessions du jour ; 04 ne lit que des index et le dernier digest.
