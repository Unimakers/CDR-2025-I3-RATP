---
layout: default
title: Robot
parent: Objectifs
nav_order: 1
has_model: true
---

# Objectifs du Robot

L'objectif principal de l'équipe RATP pour le robot pour la CDR 2025 est d'avoir un robot fiable et fonctionnel **avant** d'arriver sur place. Donc le but est de passer les homologations et s'il le faut, régler les dysfonctionnements liés à la nature du terrain en arrivant sur place pour pouvoir se concentrer uniquement sur les améliorations en match et non plus le simple fonctionnement du robot.

## Mécanique

### La base roulante

Pour assurer la mobilité du robot, nous avons opté pour des roues **mécanum**, un choix stratégique qui lui permet de se déplacer librement dans huit directions sans avoir à pivoter sur lui-même. Cette technologie offre une grande agilité et une réactivité accrue, ce qui est particulièrement avantageux dans un environnement où les déplacements doivent être rapides. 

{: .highlight }
Toutefois, cette flexibilité s’accompagne d’un défi : garantir une précision optimale dans les déplacements.


En effet, la gestion de la trajectoire et des ajustements fins nécessite un contrôle rigoureux des moteurs ainsi qu’un algorithme de correction efficace pour éviter les écarts et assurer des mouvements fluides et cohérents.

Concernant la structure du robot, nous avons choisi une conception cubique, ce qui signifie qu’il dispose de quatre faces distinctes pouvant être exploitées stratégiquement. Cette architecture nous permet de répartir les différentes tâches du robot sur chacune de ces faces, maximisant ainsi son efficacité et son autonomie. En assignant une fonction spécifique à chaque face, nous réduisons le nombre de rotations et de repositionnements nécessaires, optimisant ainsi les trajets et minimisant les pertes de temps. Cette approche améliore non seulement la rapidité d’exécution des missions, mais aussi la stabilité et la robustesse du robot dans son environnement opérationnel. Il faut cependant veiller à maintenir un robot fonctionnel tout en respectant les dimensions et les normes imposées par la compétition.

<img src="../assets/index/steppers_location.png" title="RATP2025" width="100%" />

### Les actionneurs

Pour cette édition 2025 de la coupe de france de robotique, nous aurons besoin de 2 type d'actionneurs : 
- Le premier type d'actionneur, sera des pompes, qui par aspiration, nous permetteront de déplacer les planches. Les enjeux sur ces actionneurs, seront de stabiliser la planches lors du déplacement, afin d'être sur qu'elle ne chute pas lors du déplacement. Ces pompes seront donc reliés à des ventouses, et les ventouses seront levées ou baisssées grâce à un servo moteur, pour soulever ou baisser les planches

<video width="49%" controls><source src="../assets/index/test_proto_ventouses.mp4" type="video/mp4"></video>

<cad-model src="../assets/index/Version_pince.gltf" alt="Actionneur pince planches" width="49%"></cad-model>

- Le deuxième actionneur, seront des aimants, qui seront montées sur un axe pivotant, ce qui nous permettera ou non d'aimanter les capsules. Lorsque l'ont veur aimanter les pots, le servo moteur fera tourner l'axe afin que les aimants attirent les capsules. Pour les lacher, il faudra faire tourner le servo moteur dans le sens inverse, afin de ne plus aimanter les pots. Il faudra un second servi moteur pour cet actionneur, qui permettera de soulever l'ensemble.

## Électronique

Sur le plan électronique, nous conserverons le PCB utilisé pour la CDR 2024. Cependant, il sera nécessaire d’intégrer un module permettant de réguler la tension utilisée sur la carte. Cela garantira une tension suffisante pour soulever les planches en toute sécurité. Sans cette adaptation, il existe un risque que les planches tombent lors des déplacements.

## Programmation

Cette année pour la programmation, plusieurs objectifs ont été définis dans le but d'apporter des améliorations au programme du robot de l'année dernière. Le code va être repris de [celui de l'année précédente](https://github.com/Robin864/Projet_CDR-2024_I2) qui avait été écrit en grande partie sur place et comportera dans un premier temps des améliorations portant sur la lisibilité, la cohérence et la modularité.

Ci-après une liste des objectifs allant du plus au moins prioritaire :
1. [Coordonnées absolues](#1-coordonnées-absolues)
2. [Initialisation automatique](#2-initialisation-automatique)
3. [Interpréteur de commandes](#3-interpréteur-de-commandes)
4. [Chronomètre de partie](#4-chronomètre-de-partie)
5. Exploitation du multicoeur

### 1. Coordonnées absolues

Nous avons constaté l'année dernière que l'utilisation de coordonnées relatives est une grosse contrainte pour la conception de la stratégie : elle implique de modifier les autres points qui suivent un point corrigé.  L'utilisation de coordonnées aboslues pourrait permettre l'accélération du processus de conception. Mais d'un point de vu programmation, cette fonctionnalité implique de connaitre la position courante du robot ce qui est faisable avec la fonction [currentPosition](https://www.airspayce.com/mikem/arduino/AccelStepper/classAccelStepper.html#a5dce13ab2a1b02b8f443318886bf6fc5) de AccelStepper. Il faudra aussi prévoir des points de réajustement de position sur le terrain (contre un mur par exemple) afin que la position éstimée soit la plus proche de la réalité tout au long de la partie.

### 2. Initialisation automatique

Comme son nom l'indique, l'initialisation automatique permettrait au robot de se placer en position initiale de lui-même après pression d'un bouton. L'année passée, l'équipe plaçait manuellement le robot dans un des coins du plateau ce qui pouvait amener à des approximation des positions et donc des résultats au fil des matchs.

### 3. Interpréteur de commandes

L'interpréteur de commandes pourrait être une fonctionnalité utile dans la conception de la stratégie notamment pour évaluer et valider le bon positionnement du robot pour chaque point de la stratégie. Il permettrait aussi d'intéragir facilement avec le robot en temps réel pour du débogage par exemple. Cet interpréteur serait capable de lire les informations envoyées sur le port de série (et BLE éventuellement) et d'exécuter les fonctions associées. Cet objectif est fortement inspiré de ce qu'avait fait Monsieur Topart dans son programme [TwinSystem](https://github.com/LesKaribous/Twinsystem) pour le robot de l'équipe [Les Karibous](https://leskaribous.fr/).

### 4. Chronomètre de partie

Le chronomètre de partie permettrait de toujours rester dans le temps imparti d'un match en privilégiant les actions rapportant le plus de points : si le robot est arrêté pendant la partie et qu'il perd du temps, selon le temps perdu, il va éviter les tâches rapportant le moins de points pour se concentrer sur celles en rapportant le plus, ce qui permettra d'optimiser le nombre de points gagnés quelles que soient les interruptions du match.

## Documentation

La documentation ne fait pas partie directement des objectifs pour le robot, son amélioration fait néanmoins partie des objectifs du projet CDR2025 de l'équipe RATP. L'outils `model-viewer` y a déjà été ajouté pour permettre de visualier des modèles 3D.

Un objectif a été défini pour la documentation : l'implémentation d'une animation pour visualiser le déroulé d'un match. Cette animation a pour but d'être accessible et flexible. Elle utilise le moteur P5JS et se base sur sur le [générateur de stratégie 2024](https://leskaribous.fr/StrategyToolbox/pages/strategy-2024/generateur-2024.html) de l'équipe des Karibous. Une [démonstration de cette animation](https://robin864.github.io/CDR_StrategyAnimation/) est disponible sur le Github de Robin864. Dans ce répertoire Github, des fonctionnalités sont à venir, telles que les dimensions et la gestion de l'équipe et de la vitesse de chaque éléments, la durée d'une partie ou encore le support de plusieurs type de fichier de stratégie.

Ci-après un exemple d'utilisation de ce module dans une documentation :

```html
<cdr-animation bg="assets/vinyle2024_landscape.png" height="2000" width="3000">
    <x-robot img="assets/topview_robot1.png" strategy="scripts/strategie_r1.json" height="270" width="235"></x-robot>
    <x-robot img="assets/topview_robot2.png" strategy="scripts/strategie_r2.json" height="270" width="235"></x-robot>
    <x-pami img="assets/topview_pami1.png" strategy="scripts/strategie_p1.json" height="70" width="90"></x-pami>
    <x-pami img="assets/topview_pami2.png" strategy="scripts/strategie_p2.json" height="70" width="90"></x-pami>
    <x-pami img="assets/topview_pami3.png" strategy="scripts/strategie_p3.json" height="70" width="90"></x-pami>
</cdr-animation>
```

Cette animation repecte les temps réels d'un match et vise à le reproduire le plus fidèlement possible.