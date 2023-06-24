# YourAgroData

## **Introduzione**

**Y.A.D.** è un sito web per pc che offre un servizio di consultazione ed elaborazione di dati generali riguardanti i tuoi campi agricoli.

**I Dati** si basano su informazioni recepite da **stazioni sensoriali** e **dati meteorologici**, come temperatura o umidità

**Una stazione** è composta da: un **microcontrollore** e **due sensori**: uno per la temperatura e umidità atmosferica, l’altro impiantato nel terreno misura l’umidità del suolo.

##  **Perché?**

**Il clima** è sempre in continuo cambiamento, esistono periodi con una forte siccità, e altri in cui piove costantemente. Molto spesso gli agricoltori per controllare la salute e la produzione dei loro campi, si affidano a indicatori visivi e naturali, per esempio guardano la pianta e capiscono subito se è in salute o meno, o quando devono capire quando innaffiare si affidano molto generalmente al meteo in base a quanto ha piovuto o quando pioverà.

In tutto ciò però ci possono essere degli **sprechi** e sbagliate stime, che in stagioni di siccità può essere fondamentale, non si spreca niente. Ma con le dovute **misurazioni** e **analisi** si può prevedere le condizioni che il campo sarà in un certo periodo, capendo come sfruttare le proprie risorse efficacemente.

In questo senso la tecnologia agricola si sta muovendo sempre di più nell’industria 4.0, l’utilizzo di sistemi automatizzati con connessioni che connettono i sensori con determinati elaboratori: stiamo parlando di una branca dell’**IoT** (Internet of Things) che si chiama **“Smart Agricolture”** o “agricoltura di precisione” che è l’insieme di quelle tecnologie che permette di gestire le risorse agricole in modo sostenibile.

##  **Obbiettivo**

Realizzare un sito web in cui un agricoltore, una volta che si registra ed entra nel proprio profilo, possa visualizzare le statistiche e i dati naturali dei campi, registrati da stazioni IoT sensoriali.

##  **Realizzazioni**

-   **Client web** per desktop, realizzato con **Angular**, pagine:
    -   Homepage: **/home**
    -   Pagine registrazione e login : **/registration** e **/login**
    -   Pagine gestionali: **:idUtente**/**dashboard/fields**, **:idUtente/dashboard/sensors** e **:idUtente /dashboard/weather**
-   **Server** con **Express**, gestione servizi /api in **server/server.ts**
    -   **POST /login**: date e-mail e password in input, confronta la password criptata registrata dell’utente con quella inviata, se coincide crea il token e lo aggiunge all’header authorization, accendendolo alla sua area gestionale.
    -   **POST /signin**: registra i dati compilati nel database con password crittografata con **Bcrypt**, e invia e-mail all’utente invitandolo ad accedere per confermare la registrazione.
    -   **GET /:collection/:id** : richiede i dati di una collezione dato un id, utilizzato per richiedere i dati dell’utente e dello specifico sensore.
    -   **POST add/:collection :** aggiunge un record a una collezione con una insertOne
    -   **POST edit/:collection/:id** : modifica il record dato un’id con una updateOne.
    -   **DELETE delete/:collection/:id :** elimina il record dato un ‘id con una deleteOne
    -   **GET /mapkey**: richiede la Google API key per la visualizzazione delle mappe.
-   **Database** MongoDB, collezioni: Users, Fields, Sensors e Weather, schema logico:
    -   **Users** :
    
| **Nome Campo** | **Tipologia** | **Descrizione**                       |
|----------------|---------------|---------------------------------------|
| \_id           | ObjectId      | chiave primaria                       |
| email          | string        |                                       |
| firstName      | string        |                                       |
| LastName       | string        |                                       |
| password       | string        |                                       |
| confirmed      | Boolean       | conferma che l’utente si sia iscritto |

- **Fields** :

| **Nome Campo** | **Tipologia** | **Descrizione**                                                                             |
|----------------|---------------|---------------------------------------------------------------------------------------------|
| \_id           | ObjectId      | chiave primaria                                                                             |
| idUser         | string        | chiave dell’utente                                                                          |
| name           | string        |                                                                                             |
| type           | string        | cosa viene piantato nel campo agricolo                                                      |
| polygon        | array         | Array di stringhe con le coordinate geografiche che delimitano i confini del campo agricolo |
| lat(polygon)   | double        | latitudine                                                                                  |
| lat(polygon)   | double        | longitudine                                                                                 |

- **Sensors** :

| **Nome Campo** | **Tipologia** | **Descrizione**    |
|----------------|---------------|--------------------|
| \_id           | ObjectId      | chiave primaria    |
| idUser         | string        | chiave dell’utente |
| name           | string        |                    |
| description    | string        |                    |

- **sensorData:** (time-series)

| **Nome Campo** | **Tipologia** | **Descrizione**           |
|----------------|---------------|---------------------------|
| \_id           | ObjectId      | chiave primaria           |
| idSensor       | string        | chiave del sensore        |
| atmTemperature | int           | temperatura atmosferica   |
| atmHumidity    | int           | umidità atmosferica       |
| soilHumidity   | Int           | umidità del suolo         |
| time           | datetime      | tempo della registrazione |

-   **Stazione sensoriale**, componenti:
    -   **Arduino Mega 2560** (Genuino)
    -   Sensore **DHT11**: misura umidità e temperatura atmosferica.
    -   **Soil Moisture Sensor** 1.2v **capacitativo**: misura umidità del suolo.
    -   **Resistenza** da 10 KΩ.
    -   Breadboard e cavi jumper.

##  **Sviluppi non conclusi**

1.  Aggiunta del **modulo Wi-Fi** al circuito: affinché la stazione sia IoT c’è bisogno dell’aggiunta di un modulo che permetta la connessione a una rete Wi-Fi. Si sono verificate complicanze nell’aggiungerlo a causa, molto probabilmente, di piedini usati per il trasporto dei dati difettosi.
   
##  **Sviluppi futuri**

-   Logo del progetto.
-   Miglioramenti della grafica del sito.
-   Migrazione dell’API creata con NodeJS su AWS (Amazon Web Service).
-   Caricamento del client su AWS integrandolo all’API.
-   Creazione del dominio web.
-   Aggiunta di altre funzionalità:
    -   Visualizzazione dati meteorologici della zona.
    -   Georadar dei campi registrati, utilizzo quindi di servizi satellitari.
    -   Analisi costi benefici in base alla tipologia del campo.
      