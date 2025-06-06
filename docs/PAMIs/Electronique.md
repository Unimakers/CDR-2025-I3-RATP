---
layout: default
title: Électronique
parent: PAMIs
nav_order: 2
---

### Carte électronique

Lien de la carte :
https://github.com/TiTooom/PCBetes

La première version de la carte avait trop de connecteurs, aucun moyen de faire passer facilement les nombreux câbles, la largeur des pistes n'était pas adaptée aux courants et des erreurs électroniques abîmaient la carte et ses périphériques.

<p align="center">
    <img src=".\assets\carte1.png" alt="Carte 2" style="max-width: 100%; height: auto;">
</p>

Une deuxième version vient réduire ces connecteurs, améliorer l’ergonomie et la fiabilité, mais certaines erreurs électroniques sont restées inchangées.

<p align="center">
    <img src=".\assets\carte2.png" alt="Carte 2" style="max-width: 90%; height: auto;">
</p>

La troisième version vient corriger toutes les erreurs électroniques, réduire encore le nombre de connecteurs pour ajouter d'autres fonctionnalités, la largeur des pistes a été augmentée pour supporter les courants les plus forts. Une **LED RGB** et un **écran OLED** ont été intégrés et les capteurs de distance viennent se fixer directement sur la carte sans utiliser de câbles. Une **protection ESD** vient protéger la carte contre les décharges électrostatiques et un **fusible** pour protéger contre les courants trop forts.

Les seules erreurs de cette carte sont le placement des connecteurs des capteurs de distances qui ne sont pas corrects (il faut modifier le capteur). Le fusible a une résistance trop élevée sous-alimentant la carte. Il a été retiré pour permettre le fonctionnement de la carte.

<p align="center">
    <img src=".\assets\carte3.png" alt="Carte 3" style="max-width: 100%; height: auto;">
</p>

**Fonctionnalités finales :**

* **ESP32-S3-WROOM-1-N8** Microcontrôleur
* Protocole **I2C** pour les capteurs et l'écran intégrés
* **TMC2209 DRIVERS** pour les moteurs pas à pas
* Possibilité de flash en **Type-C**
* Protocole **UART** pour communiquer avec d’autres appareils / capteurs
* Contrôle de plusieurs **servomoteurs**
* Bouton d'**arrêt d’urgence**
* **Built-in RGB LED**
* Alimentation **5V/3A via Type-C** sans PD Control
* **DC/DC Converter** pour du 3.3V 1A (AMS1117 3.3)
* **Protection ESD** pour protéger des décharges électrostatiques
* **Fusible réarmable** pour protéger contre les surcharges et les court-circuits (fusible 3.1A à remplacer)

---
