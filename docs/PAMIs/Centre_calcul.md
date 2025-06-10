---
layout: default
title: Centre de calcul
parent: PAMIs
nav_order: 4
---


## Centre de calcul

Le centre de calcul, comme le dit son nom, doit servir à calculer des éléments complexes pour les envoyer aux robots comme des équations cinématiques.

Celui que nous avons fabriqué ne calcule absolument rien, il se contente d’envoyer des informations sans interruptions.

<p align="center">
    <img src=".\assets\centre_calcul.png" alt="Centre de calcul" style="max-width: 100%; height: auto;">
</p>

La deuxième version de la carte PAMI a été réutilisée pour envoyer ses informations en boucle en début de jeu. Le protocole de communication utilisé **ESP-NOW** est extrêmement gourmand en performances et génère beaucoup de chaleur à l'intérieur du boîtier.

<p align="center">
    <img src=".\assets\centre_calcul2.png" alt="Centre de calcul" style="max-width: 100%; height: auto;">
</p>

Réduire la vitesse d’envoi des informations permettrait de réduire ces charges mais ferait augmenter la latence qui est déjà extrêmement importante.

<p align="center">
    <img src=".\assets\espnow.png" alt="Centre de calcul" style="max-width: 100%; height: auto;">
</p>


## Issue de sécurité

Une faille importante a été identifiée dans notre implémentation du protocole ESP-NOW. Bien que nous ayons configuré l'envoi de données vers des adresses MAC spécifiques, nous avons négligé de mettre en place un filtrage côté réception.

Cette vulnérabilité a eu des conséquences lors de notre dernier match où une équipe adverse a pu exploiter cette faille en envoyant des données à nos robots pendant la phase d'initialisation. Cela a provoqué une mauvaise configuration des robots qui ont démarré prématurément avant le début officiel du match.

Cette expérience souligne l'importance d'une sécurisation complète des communications sans fil dans les systèmes robotiques.

