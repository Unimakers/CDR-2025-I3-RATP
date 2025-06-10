---
layout: default
title: Communication
parent: Programmation
grand_parent: Robot
nav_order: 4
---

# Communication inter-robots

Dans le cadre du projet **I3 IoT RIOC 2025** d'UniLaSalle, l'idée d'intégrer une communication inter-robots est rapidement venue. La technologie LoRa était le premier choix puisque son application a été vue en cours. Cependant, en robotique, LoRa n'est pas tout à fait adapté de par : la latence due aux restrictions d'émissions, la portée bien suppérieure au besoin, les modules à rajouter qui n'ont pas été prévus sur la carte éléctronique.

Ce sous projet possède un [répertoire Git](https://github.com/Robin864/Projet_CDR-2025_Comm) dédié, trouvable sur Github.

Nous nous sommes donc penché sur le protocole ESP-NOW qui semble plus approprié pour notre projet. ESP-NOW est un protocole de communication sans fil développé par Espressif, destiné aux microcontrôleurs de la gamme ESP8266 et ESP32. Il permet à plusieurs appareils de communiquer directement entre eux, sans passer par un routeur ou une infrastructure réseau classique. Ce protocole, basé sur la couche physique du Wi-Fi (IEEE 802.11), mais indépendant du protocole TCP/IP, offre une latence très faible et une faible consommation d’énergie, ce qui le rend particulièrement adapté aux applications embarquées, aux objets connectés et aux systèmes sur batterie. ESP-NOW autorise l’envoi de messages courts (jusqu’à 250 octets) entre un nombre limité de nœuds (jusqu’à 20 pour l’ESP32), tout en pouvant coexister avec une connexion Wi-Fi active sur certains modèles. Grâce à sa simplicité et à son efficacité, ESP-NOW est couramment utilisé dans des projets de domotique, de réseaux de capteurs ou encore de communication entre objets autonomes.

Cette section décrit l'appréhension de ESP-NOW à tavers la coupe de france le robotique et présente son implémentation ainsi que les difficultés rencontrées.

## Cahier des charges

Le cahier des charges de la communication inter-robots a été défini librement, selon une logique d’initiative personnelle. L’objectif était de concevoir un système de communication ambitieux, à la fois fonctionnel et techniquement stimulant, pour repousser les limites des compétences acquises en cours et explorer des solutions avancées adaptées aux contraintes robotiques réelles.

Ainsi, les choix techniques, les objectifs de performance et les contraintes retenues ont été volontairement orientés vers la complexité. Ce parti pris a permis de transformer ce sous-projet en un véritable terrain d’expérimentation, où l’exigence technique allait de pair avec l’enjeu pédagogique. Le résultat visé : une communication inter-robots robuste, réactive, optimisée pour des échanges en temps réel, et adaptée à un environnement de compétition dynamique.

Cette communication permettait de communiquer depuis le robot principal avec les PAMIs les informations relatives à l'initialisation telles que l'équipe selectionnée et la tirette de lancement.

Voici les objectifs définis :

<p>1. Utilisation du microcontrôleur du robot principal (programmation C++)</p>

>  Le robot principal possède un microcontrôleur qui lui permet d'agir sur le terrain. Il initialise le robot, suit une stratégie et s'arrête après un temps donné par les règles du jeu. La difficulté de cet objectif réside dans la cohabitation de la communication inter-robot avec le reste du programme (déplacement, actionneurs, ...). Lors de l'initialisation, le robot doit communiquer aux PAMIs ses informations (équipe et tirette), ces derniers reçoivent l'information et la traite en conséquence : si l'équipe change alors changer la stratégie courrante, si la tirette est retirée alors démarrer la stratégie.

<p>2. Communication multidirectionnelle qui permet de recevoir une confirmation de réception</p>

>  Afin de ne pas perdre d'information et de fiabiliser la communication, il est essentiel de vérifier que l'information transmise à bien été reçu à l'image du TCP/IP. L'émetteur pourrait réagir à l'erreur de transmission potentiel pour envisager un nouvel envoi.

<p>3. Instanciation/création de classe pour faciliter la réutilisation et optimiser la modularité</p>

>  Le programme des robots est axé autour de modules appelés classes et permettant de faciliter la maintenance, la réutilisation, la fléxibilité/modularité. La communication ne doit pas faire exception, elle doit pouvoir être instanciée simplement dans un premier temps. Dans un second temps il serait de bon augure de vérifier qu'un objet de la classe communicaton est déjà présent avant d'en construire un nouveau afin d'éviter les conflits. Enfin, la classe conviendrait aussi bien pour le robot principal que pour les PAMIs pour éviter de modifier le programme entre chaque envois sur le microcontrôleur.

<p>4. Traitement des échecs d'envois en utilisant des timers</p>

>  Un envoi peut ne pas arriver à son destinataire, c'est pour cela qu'il est intéressant d'integrer au système un renvoi lorsqu'un echec est rencontré. Cet objectif va de pair avec le premier puisqu'il est necessaire d'obtenir une validation de réception avant de pouvoir confirmer un renvoi. La difficulté de cet objectif se trouve dans la mise en pause d'un envoi continu sans mettre en pause le déroulement du programme.

## Découverte de ESP-NOW

L'intégration d'ESP-NOW dans notre projet a nécessité une première phase d’exploration du protocole. L’objectif principal était de comprendre les prérequis matériels et logiciels ainsi que le fonctionnement des échanges pour pouvoir mettre en place une communication efficace entre les différents robots. Cette section présente les étapes fondamentales d’initialisation et de configuration d’ESP-NOW sur les microcontrôleurs ESP32, en distinguant les rôles du robot principal (master) et des robots secondaires (PAMIs, considérés ici comme clients ou peers).

### Initialisation du protocole

Avant d'utiliser ESP-NOW, il est indispensable d’initialiser le Wi-Fi en mode `WIFI_STA` (station). Bien que ESP-NOW repose sur la couche physique du Wi-Fi, il ne nécessite ni point d’accès ni connexion à un réseau existant. Le mode `WIFI_STA` permet simplement d’activer la couche radio du module ESP, condition nécessaire à l’utilisation du protocole.

```c++
WiFi.mode(WIFI_STA);
WiFi.disconnect(); // Déconnexion des éventuels points d'accès précédents
```

Une fois le WiFi configuré, on initialise le protocole EPS-NOW :

```c++
if (esp_now_init() != ESP_OK)
{
    ERROR("Erreur d'initialisation ESP-NOW");
    return;
}
```

Cette configuration est propre au deux types de communicants : le master et les peers. Cependant, la suite de la configuration ne l'est pas. Les deux points qui suivents illustrent l'ajout de peer pour le master et la configuration de la réception pour les peers.

**Le robot principal**, qui initie les communications, doit connaître à l’avance les adresses MAC des robots avec lesquels il souhaite communiquer. Ces adresses sont enregistrées via la fonction `esp_now_add_peer()`, qui configure un peer pour les transmissions futures.

```c++
esp_now_peer_info_t peerInfo = {};
memcpy(peerInfo.peer_addr, mac, 6); // Ici l'adresse mac est un tableau de bytes
peerInfo.channel = 0;               // Le channel 0 est le channel WiFi
peerInfo.encrypt = false;           // Dans notre cas il n'est pas forcément nécessaire de chiffrer la communication

if (esp_now_add_peer(&peerInfo) != ESP_OK)
{
    ERROR("Impossible d'ajouter le peer");
    return;
}
```

Cette opération est répétée pour chaque PAMI. Il est possible d’ajouter jusqu’à 20 peers sur un ESP32.

Du côté des **PAMIs**, on attache une fonction de callback qui sera appelée automatiquement à chaque réception de message. Cela permet de réagir en temps réel à une consigne envoyée par le robot principal. Chaque message reçu peut être interprété en fonction de sa structure (identifiant, action à effectuer, valeur, etc.). Il est recommandé d’utiliser une structure C pour organiser les données.

```c++
struct {
    bool tir;
    char team;
} comm;

void OnDataRecv(const uint8_t *mac, const uint8_t *incomingData, int len)
{
    memcpy(&comm, incomingData, sizeof(comm)); // Copie des information sous forme de structure identique à celle de l'envoyeur
}

esp_now_register_recv_cb(OnDataRecv);
```

Pour envoyer une structure aux PAMI, le robot principal utilise :

```c++
esp_err_t result = esp_now_send(mac, (uint8_t *) &message, sizeof(message));

if (result == ESP_OK) {
    DEBUG("Envoi réussi");
} else {
    DEBUG("Erreur lors de l'envoi");
}
```

Bien que ESP-NOW ne garantisse pas la réception comme TCP/IP, il est possible d’attacher un callback à la fin de chaque envoi pour connaître le statut de la transmission :

```c++
void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {
    DEBUG("Statut de l'envoi : ");
    DEBUG(status == ESP_NOW_SEND_SUCCESS ? "Succès" : "Échec");
}

esp_now_register_send_cb(OnDataSent);
```

Cette fonctionnalité a été utilisée pour mettre en place des mécanismes de réenvoi conditionnel en cas d’échec de transmission.

## Optimisation des envois avec les timers

L’un des objectifs centraux du sous-projet de communication inter-robots était d'assurer la fiabilité des échanges grâce à un mécanisme de confirmation et de renvoi automatique en cas d’échec de transmission. Pour cela, il était nécessaire de mettre en place un système de temporisation, capable de vérifier, après un certain délai, si un message envoyé avait bien été reçu. En l’absence de confirmation, un nouvel envoi devait être déclenché automatiquement.

### Tentative initiale avec les timers Arduino

Dans un premier temps, l’approche choisie s’est naturellement tournée vers les outils disponibles dans le framework Arduino, notamment l’utilisation des timers logiciels, souvent gérés via des interruptions (ISR - Interrupt Service Routine). L’idée était d’instancier des objets timers indépendants, permettant à chaque tentative d’envoi de s’accompagner d’un délai propre de relance.

Cependant, cette approche s’est révélée rapidement problématique :

- Les ISR d’Arduino sont très limitées : elles ne peuvent exécuter que des instructions très courtes, sans appel système, ni manipulation d’objets complexes ou d’allocation mémoire.

- L’instanciation orientée objet devenait impraticable : la fonction de rappel (callback) associée au timer devait être déclarée en dehors de toute classe (fonction globale), ce qui rendait impossible l’accès direct aux attributs d’une instance ou à un contexte particulier.

- La stabilité du système devenait critique : dès que le code dans l’interruption dépassait un certain temps ou accédait à une ressource bloquante, le microcontrôleur pouvait redémarrer ou geler.

Ce constat a mis en lumière les limites de l’approche Arduino dans un contexte embarqué avancé, surtout lorsqu’on souhaite privilégier modularité, instanciation orientée objet, et gestion asynchrone propre.

### Transition vers l’API timer d’ESP-IDF

Afin de contourner ces limitations, l’étude s’est poursuivie du côté de l’API native ESP-IDF, beaucoup plus adaptée à des scénarios complexes. Cette API propose une gestion plus fine des timers, en permettant notamment :

- Le déclenchement d’une tâche dédiée, plutôt qu’une simple ISR.

- Une configuration plus poussée des timers (périodique, unique, auto-restart...).

- La séparation claire entre la partie critique (interruption minimale) et la logique applicative (gérée en tâche libre).

Principe général

1. Création du timer par son constructeur.

2. Configuration du timer par `setup()`.

3. Démarrage du timer.

4. Lors de l’expiration du timer, une tâche est exécutée via un callback dans lequel l'objet courrant est copié afin d'avoir accès à ses attribus.

5. Cette tâche peut alors vérifier l’état de la communication, renvoyer un message si besoin, ou annuler un autre timer.

```c++
class Timer
{
public:
    Timer(void (*function)(), int duration, TimeUnit unit, int cbIteration, bool _release) : fn(function), max(cbIteration), release(_release)
    {
        if (duration < 1 || cbIteration < 1)
        {
            return;
        }

        timerDuration = duration * unit;
    };

    esp_err_t setup()
    {
        esp_timer_create_args_t timerArgs = {
            .callback = &callback, // Méthode callback statique
            .arg = this // Copie de l'objet courant en argument
        };

        return esp_timer_create(&timerArgs, &timer);
    };

    // ...

private:
    esp_timer_handle_t timer = nullptr; // Timer lié
    void (*fn)(void); // Fonction attachée

    static void callback(void *arg) // Méthode callback
    {
        // ...
    };

    // ...
}
```

Cette méthode permet enfin de respecter les exigences initiales :

- Modularité : chaque instance de communication peut avoir son propre timer.

- Sécurité : le traitement se fait en dehors de l’interruption.

- Fiabilité : le système peut relancer automatiquement un message en cas d’échec.

Cette partie du projet s’est révélée particulièrement formatrice, en confrontant directement les limites de certains outils usuels (Arduino) et en incitant à explorer des solutions plus bas niveau, mais plus puissantes comme l’ESP-IDF. Bien que les résultats concrets soient encore en phase expérimentale, cette transition ouvre la voie vers une implémentation robuste et professionnelle, capable de gérer les aléas de communication dans un environnement robotique temps réel.

## Retour d'expérience – Problèmes rencontrés lors de la Coupe

Malgré une préparation minutieuse en laboratoire, plusieurs problèmes critiques ont émergé lors de l’épreuve réelle à la Coupe de France de Robotique. Ces imprévus ont révélé les limites du système en environnement saturé et ont mis en lumière des failles de conception qu’il aurait été possible d’anticiper.

### Latence anormalement élevée

Lors des tests dans notre laboratoire de robotique, la latence entre l’envoi des informations depuis le robot principal et leur réception par les PAMIs était quasi imperceptible — de l’ordre de quelques dizaines de millisecondes. Cependant, le jour de la coupe, un décalage de près de 5 secondes a été constaté. Dans le cadre d’un match de 100 secondes, un tel délai constitue une perte critique de réactivité et compromet totalement le bon déroulement de la stratégie.

La cause probable de ce phénomène réside dans la saturation de la bande 2.4 GHz, fréquemment utilisée pour le Wi-Fi classique et également exploitée par ESP-NOW. Lors de la compétition, des centaines d'appareils Wi-Fi étaient actifs simultanément : smartphones, routeurs d’équipes, systèmes de télémétrie, etc. Cette congestion du spectre a vraisemblablement perturbé la communication entre les robots.

À noter que certaines équipes ont opté pour des systèmes basés sur du Wi-Fi en 5 GHz, bénéficiant ainsi d’un spectre moins saturé et d'une meilleure réactivité. Malheureusement, les modules ESP32 utilisés dans notre projet ne supportent que la bande 2.4 GHz, ce qui limite considérablement les possibilités d’évitement de ce type de problème.

### Réception de messages non destinés

Un autre incident important a été observé : les robots secondaires (PAMIs) recevaient des messages que nous n’avions jamais envoyés. Ces messages, bien que techniquement valides, ne correspondaient à aucune action prévue dans notre système. Après analyse, il est probable que ces messages provenaient d’autres équipes utilisant également ESP-NOW, avec une structure de données identique ou similaire.

Le protocole ESP-NOW, bien que performant, n’intègre pas nativement de système d’adressage applicatif. Il repose uniquement sur les adresses MAC pour identifier les pairs. En l’absence d’une vérification explicite de l’adresse MAC de l’émetteur, les PAMIs ont traité comme valides des messages émis par d’autres robots (non-maîtres), ce qui a introduit de la confusion dans la logique de stratégie.

Cette erreur aurait pu être évitée en intégrant dès la réception une vérification stricte de l’adresse MAC :

```c++
void OnDataRecv(const uint8_t *mac, const uint8_t *incomingData, int len)
{
    if (memcmp(mac, mac_master, 6) != 0)
    {
        DEBUG("Message ignoré : source non autorisée");
        return;
    }
    // Traitement normal du message
}
```

Cette vérification simple aurait permis de rejeter tout message non émis par le robot principal, garantissant une communication exclusive et fiable au sein de notre système.

## Conclusion

Ce sous-projet de communication inter-robots, mené dans le cadre du projet I3 IoT RIOC 2025, a représenté une véritable expérience d’apprentissage, à la fois sur les plans technique, méthodologique et personnel. Bien que tous les objectifs initiaux n’aient pas été pleinement atteints, en particulier en raison de certaines contraintes matérielles (latence non maîtrisée, interférences Wi-Fi) et de limitations dans l’implémentation (timers instanciables, filtrage par adresse MAC), le projet a rempli son rôle de terrain d’expérimentation avancée.

La mise en œuvre d’un protocole comme ESP-NOW, jusque-là inconnu, a permis d’approfondir des notions essentielles autour de la communication sans fil, de la gestion de la concurrence et de l’asynchronisme en environnement embarqué. Ces connaissances, ancrées dans la pratique, ont été complétées par une montée en compétence significative en C++, notamment dans la structuration orientée objet, la gestion des callbacks et la modularité du code.

Au-delà de l’aspect technique, ce projet m’a confronté aux réalités des systèmes temps réel et des environnements contraints. Il a mis en lumière l’importance de concevoir des solutions résilientes, testées en conditions réelles et d’anticiper les risques liés à l’intégration avec des systèmes tiers (saturation radio, conflits d’adressage, etc.).

Enfin, malgré les imprévus et les défis rencontrés, ce travail restera pour moi une expérience enrichissante, passionnante et formatrice, qui m’a donné envie de continuer à explorer les domaines du temps réel, de la connectivité embarquée et de la programmation système.
