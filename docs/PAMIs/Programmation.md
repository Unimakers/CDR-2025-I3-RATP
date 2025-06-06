---
layout: default
title: Programmation
parent: PAMIs
nav_order: 3
---

### Programmation

Tous les composants évoqués précédemment sont codés dans des **librairies personnalisées**. Chaque élément est programmé en utilisant une **classe**, permettant d’ajouter d'autres périphériques du même type sans avoir à ajouter de code. L’utilisation de classes pour instancier les périphériques rend l’ensemble du projet plus complexe bien que plus sécurisé et plus modulaire.

Tous les éléments sont utilisés dans un fichier principal qui vient instancier et initialiser les périphériques. Puis ce fichier vient dicter la **stratégie de jeu** en coordonnant les périphériques.

Une **standardisation du code** a été mise en place avec celui du robot principal en imposant un type de périphérique par fichier. Le désavantage de cette standardisation c’est qu'elle rend le code plus complexe pour faire communiquer des éléments. De plus, le temps de compilation augmente significativement, faisant perdre plus de temps à chaque modification du code.

Un **seul code est utilisé pour les 4 robots PAMI**. Le programme vient récupérer l’adresse MAC du contrôleur et fait varier les actions des robots en fonction de celle-ci. Cela permet d’avoir 4 robots mécaniquement, électroniquement et logiciellement identiques, facilitant la résolution des problèmes.

#### Initialisation

Au début de la partie, le robot PAMI est allumé, il initialise tous ses composants pendant environ 5 secondes.

Puis, il active un protocole de communication appelé **ESP-NOW** pour recevoir des informations supplémentaires comme l'équipe pour laquelle il doit jouer et si la partie a commencé. La **LED RGB** sert de confirmation de la réception des messages :
* Si la LED est **rouge**, le robot est initialisé et a reçu l'équipe.
* Si la LED est **orange**, la tirette de lancement de partie a été placée sur le centre de calcul.
* Si la LED passe au **vert**, le robot reçoit l’ordre de commencer la partie.

#### Vidéo Démo ESP-NOW

Pour mieux comprendre le fonctionnement du protocole **ESP-NOW**, vous pouvez consulter la vidéo de démonstration suivante :

https://youtube.com/shorts/jdEfoFnzGrI?feature=share

[![Vidéo Démo ESP-NOW](https://img.youtube.com/vi/<VIDEO_ID>/0.jpg)](https://youtube.com/shorts/jdEfoFnzGrI?feature=share)


Une fois qu’il a récupéré ces informations, ce protocole est coupé et le robot joue la stratégie pour remplir son rôle.

L’avantage de ce protocole est qu’il peut configurer et lancer tous les robots d’un seul coup via un centre de calcul présent sur le côté de la table de jeu. Le désavantage est que la bande passante 2.4GHz sur les lieux est extrêmement perturbée par les différents participants de la coupe, provoquant une latence impressionnante allant jusqu'à 10 secondes dans les pires moments. Pire que cette latence, lors de notre dernière partie, une équipe a été capable d’envoyer des informations à nos robots les faisant partir pendant le temps de préparation.

<p align="center">
    <img src=".\assets\prog.png" alt="Programmation" style="max-width: 100%; height: auto;">
</p>

---
