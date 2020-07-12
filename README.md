# Musikult
Progetto per il corso Reti di Calcolatori - Sapienza (2019-2020)


## **Descrizione**

Musikult è una pagina nel quale l'utente può navigare tra i suoi brani e i suoi aritsti preferiti, ascoltare musica e contribuire al nostro database di testi musicali.

Nella pagina principale l'utente può cercare brani e artisti oppure fare log-in con il suo account di Spotify. Il log-in di Spotify offre all'utente opzioni aggiuntive per la navigazione, come la possibilità di visualizzare i propri artisti preferiti o di ascoltare su un player di Spotify la musica trovata.


## **Avvio**

- Per installare le dipendenze eseguire `npm install`

- Installare MySQL, impostare la password dell'utente root nel file keys.js

- Per avviare il server eseguire `node app`

- Se all'avvio il database MySQL restituisce l'errore ER_NOT_SUPPORTED_AUTH_MODE, eseguire nella shell di MySQL il comando `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`


## **Test**

Il programma di test esegue delle prove di utilizzo delle API e del database, durante la sua esecuzione un log sul terminale mostrerà l'andamento del test.
Per avviare il programma di test eseguire `test app`, il server deve essere in esecuzione.

## **Tecnologie utilizzate**
#### **Back-end**

- NodeJS

- REST

- WebSockets

#### **Front-end**


## **API utilizzate**

## **API fornite**


## **Struttura del progetto**


<p align="center">
  <img src="views/img/icon.png" width="200" />
</p>
