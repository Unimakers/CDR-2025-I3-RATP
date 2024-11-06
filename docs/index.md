---
layout: home
nav_order: 1
title: Accueil
has_3dmodel: true
---

# Bienvenue sur notre Documentation

Bienvenue dans la documentation du projet RATP 2025 (Robot Automatisé Transporteur de Planches). Ce site a pour but de fournir toutes les informations nécessaires pour comprendre et utiliser efficacement notre projet.

## À propos du Projet

Le projet RATP est motivé par une chose : **participer à la coupe de France de robotique (CDR) 2025** ! Notre équipe est composée de quatre étudiants de deuxième année de cycle pré-ingénieur motivés. La CDR exige d'avoir un robot fonctionnel capable de ramasser des planches et des concerves de façon autonome et de construire une structure avec, pour plus de précisions, vous pouvez consulter [le site de la CDR](https://www.coupederobotique.fr/). 

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

- [git](https://git-scm.com/)
- [Ruby](https://www.ruby-lang.org/fr/)
- [make](https://www.gnu.org/software/make/manual/make.html) _(optionnel)_

### Exécution

1. Cloner le répertoire git localement
```sh
git clone https://github.com/Unimakers/CDR-2025-I3-RATP.git && cd CDR-2025-I3-RATP
```

2. Installer les dépendances à l'aide de bundler
```sh
cd docs # On se place dans le répertoire contenant le fichier Gemfile
bundle install
```

3. Exécuter le site
```sh
bundle exec jekyll serve
```

4. Ouvrer le navigateur web à l'adresse [http://localhost:4000](http://localhost:4000)

Les modifications apportées aux fichiers markdown prendrons automatiquement effet après sauvegarde de ces derniers et rafraichissement de la page.

_Alternativement_, il est possible d'utiliser `make` pour éviter l'utilisation de ces commandes :

```sh
make setup # Installe les dépendances
make run # Ou simplement make : Lance le site
```
_OU_
```sh
make firstrun
```

Une fois le site lancé, bundle, jekyll et gems génèrent des dossiers et fichiers qui peuvent nuire à la clareté de l'édition. Pour les supprimer facilement, il est possible d'utiliser la commande `make clean` lorsque le site n'est pas en fonctionnement.

</details>


<details markdown="block">
<summary>Insertion d'images</summary>

Pour insérer une image, l'ajouter dans le répertoire `assets` contenu dans `docs` puis créer un chemin semblable à celui de la page courrante.

__Exemple :__

- Si le document édité est `Robot/Programmation/index.md`, le chemin vers l'image sera `../../assets/Robot/Programmation/index/image.png`.

- Le chemin d'accès à l'image est relatif, le répertoire `docs/` est considéré comme étant la racine. Si le document édité se trouve dans un/des sous répertoire(s) de `docs/`, le chemin d'accès relatif à l'image comportera autant de retour de dossier que de sous dossiers dans lesquels se trouve le document :
    
    - Accès images depuis `docs/` : `assets/{folder_name}/*.png` où `{folder_name}` devra être remplacé par le nom du document. Celui-ci étant index, les images se trouveront dans `assets/index/`. `docs/` est la racine donc le chemin d'accès relatif aux images ne comporte pas de retour de dossier.

    - Accès images dans `docs/Robot/` : `../assets/Robot/{folder_name}/*.png`. `Robot/` est un répertoire de `docs` donc le chemin d'accès relatif à l'image comportera un retour de dossier.

    - Accès images dans `docs/Robot/Programmation/` : `../../assets/Robot/Programmation/*.png`. `Programmation/` est un sous répertoire de `docs` donc le chemin d'accès relatif à l'image comportera deux retours de dossier.

    - ...

Les balises html de l'image inserée ci-après :
```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<img src="assets/index/exemple.png" title="Image d'exemple" width="100%" />

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
```

<img src="assets/index/exemple.png" title="Image d'exemple" width="100%" />
{: .text-center }

Ces balises pourront être suivie de `{: .text-center }` sur la ligne suivante pour centrer l'image comme suit :

```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<img src="assets/index/exemple.png" title="Image d'exemple" width="100%" />
{: .text-center }

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
```

</details>


<details markdown="block">
<summary>Insertion de modèles 3D</summary>

Pour ajouter un modèle 3D à la page, suivre la même démarche que pour une image. Le format **gltf** est supporté.

{: .warning }
Penser à ajouter le paramètre `has_3dmodel: true` dans l'entête du document markdown autrement, le modèle ne s'affichera pas !



Les balises html du modèle inseré ci-après :
```markdown
--- <!-- Entête yaml en début de document -->
layout: default
nav_order: 1
title: Exemple
has_3dmodel: true
---

<model-viewer title="Servo" src="assets/index/SG90.gltf" shadow-intensity="1" camera-controls touch-action="pan-y" ></model-viewer>
```

<model-viewer title="Servo" src="assets/index/SG90.gltf" shadow-intensity="1" camera-controls touch-action="pan-y" ></model-viewer>

La taille du cadre sur la page est défini en CSS dans le fichier `_layout/default.html:13-19`. Pour l'ajuster, les paramètres peuvent être écrasés en les ajoutant avant la balise `<model-viewer>` comme suit :

```markdown
<style>
    model-viewer {
        width: 30vw;
        height: 30vw;
    }
</style>
<model-viewer title="Servo" src="assets/index/SG90.gltf" shadow-intensity="1" camera-controls touch-action="pan-y" ></model-viewer>
```

Les options utilisées dans `model-viewer`: 

- `shadow-intensity="i"` comme son nom l'indique sert à ajuster l'intensité de l'ombre du modèle.
- `camera-controls` permet d'activer l'intéraction par l'utilisateur.
- `touch-action="pan-y|pan-x|none"` dicte l'intéraction tactile par l'utilisateur.

Toutes les options disponibles sont listées et expliquées sur le site [model-viewer](https://modelviewer.dev/docs/index.html) au besoin.

</details>