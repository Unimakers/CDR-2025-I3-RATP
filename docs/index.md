---
layout: home
nav_order: 1
title: Accueil
---

# Bienvenue sur notre Documentation

Bienvenue dans la documentation du projet RATP 2024 (Robot Automatisé Transporteur de Plantes). Ce site a pour but de fournir toutes les informations nécessaires pour comprendre et utiliser efficacement notre projet.

## À propos du Projet

Le projet RATP est motivé par une chose : **participer à la coupe de France de robotique (CDR) 2025** ! Notre équipe est composée de septs étudiants de deuxième année de cycle pré-ingénieur motivés. La CDR exige d'avoir un robot fonctionnel capable de ramasser des plantes de façon autonome et de les déposer dans des zones prédéfinies, pour plus de précisions, vous pouvez consulter [le site de la CDR](https://www.coupederobotique.fr/). 

## Commencer
Pour débuter avec le projet RATP, consultez notre section [Démarrage rapide](/404).

## Ressources

- **Guide d'Installation** : Instructions détaillées pour installer et configurer le projet.
- **Tutoriels** : Des tutoriels pour vous aider à démarrer avec le projet.
- **FAQ** : Réponses aux questions fréquemment posées.

## Contribuer

Si vous souhaitez contribuer au projet, consultez notre page [Instagram](https://www.instagram.com/equipe_ratp/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA==).

Nous espérons que cette documentation vous aidera à tirer le meilleur parti du projet RATP. Si vous avez des questions ou des suggestions, n'hésitez pas à nous contacter.

## Mémos

<details markdown="block">
<summary>Utiliser le site en local</summary>

### Prérequis

- git
- [Ruby](https://www.ruby-lang.org/fr/documentation/installation/)

### Execution

1. Cloner le répertoire git localement
```sh
git clone https://github.com/Unimakers/CDR-2025-I3-RATP.git
```

2. Installer les dépendances à l'aide de bundler
```sh
cd CDR-2025-I3-RATP/docs # On se place dans le répertoire précédemment cloné
bundle install
```

3. Executer le site
```sh
bundle exec jekyll serve
```

4. Ouvrer le navigateur web à l'adresse `http://localhost:4000`

Les modifications apportées aux fichiers markdown prendrons automatiquement effet après sauvegarde de ces derniers et rafraichissement de la page.

</details>

<details markdown="block">
<summary>Insersion d'images</summary>

Pour inserer une image, l'ajouter dans le répertoire `assets` contenu dans `docs` puis créer un chemin semblable à celui de la page courrante.

__Exemple :__

- Si le document édité est `Robot/Programmation/index.md`, le chemin vers l'image sera `../../assets/Robot/Programmation/index/image.png`.

- Le chemin d'accès à l'image est relatif, le répertoire `docs/` est considéré comme étant la racine. Si le document édité se trouve dans un/des sous répertoire(s) de `docs/`, le chemin d'accès relatif à l'image comportera autant de retour de dossier que de sous dossiers dans lesquels se trouve le document :
    
    - Accès images depuis `docs/` : `assets/{folder_name}/*.png` où `{folder_name}` devra être remplacé par le nom du document. Celui-ci étant index, les images se trouveront dans `assets/index/`. `docs/` est la racine donc le chemin d'accès relatif aux images ne comporte pas de retour de dossier.

    - Accès images dans `docs/Robot/` : `../assets/Robot/{folder_name}/*.png`. `Robot/` est un répertoire de `docs` donc le chemin d'accès relatif à l'image comportera un retour de dossier.

    - Accès images dans `docs/Robot/Programmation/` : `../../assets/Robot/Programmation/*.png`. `Programmation/` est un sous répertoire de `docs` donc le chemin d'accès relatif à l'image comportera deux retours de dossier.

    - ...

Les balise html de l'image inserée ci-après :
```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<img src="assets/index/exemple.png" title="Image d'exemple" width="100%" />

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
```

<img src="assets/index/exemple.png" title="Interface de PlatformIO" width="100%" />
{: .text-center }

Ces balises pourront être suivie de `{: .text-center }` sur la ligne suivante pour centrer l'image comme suit :

```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<img src="assets/index/exemple.png" title="Image d'exemple" width="100%" />
{: .text-center }

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
```

</details>