---
layout: default
title: Actionneurs
parent: Mecanique
grand_parent: Robot
nav_order: 3
---

# Inserer votre contenu


## Support des actionneurs
Chaque actionneur est monté sur un support rigide, lui-même fixé au châssis MakerBeam à l’aide d’équerres imprimées en 3D. Cette solution modulaire offre deux avantages majeurs : d’une part, la robustesse nécessaire pour encaisser les efforts lors des cycles répétés, et d’autre part, la possibilité de régler précisément la hauteur de l’actionneur en fonction de la configuration des éléments de jeu.


Le réglage vertical s’opère grâce à un dispositif de guidage linéaire constitué de rails IGUS associés à des chariots adaptés. Un servo-moteur dédié transforme son mouvement de rotation en déplacement linéaire : via deux articulations découpées au laser, la rotation du servo entraîne une liaison latérale solidaire du chariot, lequel glisse alors de haut en bas dans le rail. Ce mécanisme astucieux permet de lever ou d’abaisser l’actionneur rapidement, simplement et avec une grande précision, sans nécessité de desserrer de vis ou d’interrompre le montage.

En pratique, lors de la phase de calibration, on positionne le support à la hauteur souhaitée puis on verrouille l’équerre. Ensuite, le réglage fin se fait en actionnant le servo : une simple impulsion numérique suffit à ajuster l'actionneur au millimètre près. Cette flexibilité de réglage rend l’assemblage et la maintenance beaucoup plus rapides, tout en garantissant une répétabilité parfaite des mouvements.

## L'actionneur planche

L’actionneur « Planche » a pour mission de prendre en charge et de déplacer les planches du plateau de jeu en les transportant par aspiration. Pour cela, nous avons sélectionné des pompes à vide adaptées au débit et à la dépression nécessaires pour maintenir fermement chaque planche sans risque de glissement.

Les pompes sont reliées, via des durites souples, à une interface en aluminium usiné qui fait office de répartiteur entre l’alimentation sous vide et les ventouses positionnées sur la face inférieure de la planche. Cette interface centralise les connections et assure une étanchéité parfaite, tout en offrant un point unique de maintenance si l’on doit remplacer une durite ou une ventouse.

Une fois la planche aspirée par les ventouses, le mécanisme de levage prend le relais. L’interface est montée sur un bras actionné par un servomoteur, qui permet de lever ou d’abaisser la planche selon les phases de la tâche. Grâce à ce servo, le mouvement vertical est fluide et rapide : dès que la planche est solidement fixée, un angle de rotation précis du moteur entraine le déplacement du bras, offrant un ajustement au millimètre près de la hauteur de transport.

Cette combinaison de pompes à vide, de répartiteur de durites et de servomoteur de levage garantit une prise sûre, un transport stable et un positionnement exact des planches, tout en simplifiant les opérations de remplacement ou d’entretien grâce à la conception modulaire de l’interface.

## Actionneur « Conserve »
L’actionneur « Conserve » a été conçu pour permettre la prise, le transport et le relâchement contrôlé de conserves métalliques placées sur le terrain de jeu. Pour réaliser cette tâche sans contact mécanique complexe ni système de préhension encombrant, nous avons choisi une solution magnétique, simple, fiable et rapide à mettre en œuvre.

Le cœur de cet actionneur repose sur des aimants permanents, qui permettent d’aimanter la conserve lorsqu’ils sont orientés face à elle, et de la relâcher lorsqu’ils sont tournés dans la direction opposée. Concrètement, l’aimant est fixé à un axe rotatif ; lorsqu’on souhaite attraper la conserve, l’aimant est positionné avec sa face nord ou sud orientée vers elle, créant ainsi une force d’attraction suffisante pour que la conserve reste collée. Pour relâcher l’objet, l’aimant est simplement tourné de 180°, ce qui oriente sa polarité de manière à réduire considérablement l’effet magnétique ou à créer une répulsion partielle, permettant ainsi à la conserve de se détacher naturellement.

Afin de stabiliser la conserve pendant les phases de déplacement, des taquets latéraux ont été ajoutés de chaque côté de l’aimant. Ces taquets agissent comme des guides mécaniques : ils empêchent la conserve de pivoter ou de glisser accidentellement, notamment lors des mouvements brusques du robot.

Disposition magnétique : Halbach Array
Les aimants utilisés dans l’actionneur sont organisés selon une configuration de type Halbach Array. Il s’agit d’un arrangement particulier d’aimants permanents dans lequel la direction de magnétisation est soigneusement orientée de manière à concentrer le champ magnétique d’un côté tout en le minimisant de l’autre.

Dans une Halbach Array linéaire simple, chaque aimant est orienté à 90° par rapport au précédent. Cette disposition produit un champ magnétique fort et homogène d’un côté (celui en contact avec la conserve) et quasiment nul de l’autre côté (vers l’intérieur du robot). Cette propriété est idéale dans notre cas, car elle permet de maximiser la force d’attraction sur la conserve tout en limitant les interférences avec les composants électroniques du robot et les éléments sensibles à proximité.

L’utilisation d’une Halbach Array nous permet également d’optimiser la compacité de l’actionneur : au lieu d’augmenter la taille ou la puissance des aimants, nous exploitons leur orientation pour obtenir un champ magnétique efficace, ciblé, et maîtrisé.

## L'actionneur banderole