import http from "http";
import https from "https";
import url from "url";
import fs from "fs";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import express, { NextFunction } from "express";     
import axios from "axios";           
import { Http2ServerResponse } from "http2";

// config
const cors = require('cors')
const HTTP_PORT = 1337;
const HTTPS_PORT = 1338
dotenv.config({ path: ".env" });
const app = express();
const connectionString: any = process.env.connectionString;
const DBNAME = "YAD";
const whitelist = ["http://localhost:1337","http://localhost:4200", "https://localhost:1338"];
  
const privateKey = fs.readFileSync("keys/privateKey.pem", "utf8");
const certificate = fs.readFileSync("keys/certificate.crt", "utf8");
const credentials = { "key": privateKey, "cert": certificate };

//CREAZIONE E AVVIO DEL SERVER HTTP

let httpServer = http.createServer(app);
httpServer.listen(HTTP_PORT, () => {
  init();
});

let httpsServer = https.createServer(credentials, app);
httpsServer.listen(HTTPS_PORT, function () {
  console.log("Server in ascolto sulle porte HTTP:" + HTTP_PORT + ", HTTPS:" + HTTPS_PORT);
});

let paginaErrore: string = "";
function init() {
  fs.readFile("./static/error.html", function (err: any, data: any) {
    if (!err)
      paginaErrore = data.toString();
    else
      paginaErrore = "<h1>Risorsa non trovata</h1>"
  });
}

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin) // browser direct call
      return callback(null, true);
    if (whitelist.indexOf(origin) === -1) {
      var msg = `The CORS policy for this site does not
 allow access from the specified Origin.`
      return callback(new Error(msg), false);
    }
    else
      return callback(null, true);
  },
  credentials: true
};

/***********MIDDLEWARE****************/
// 1 request log
app.use("/", (req: any, res: any, next: any) => {
  console.log(req.method + ": " + req.originalUrl);
  next();
});

// 2 gestione delle risorse statiche
//cerca le risorse nella cartella segnata nel path e li restituisce
app.use("/", express.static("./static"));

// 3 lettura dei parametri POST
app.use("/", express.json({ limit: "50mb" }));
app.use("/", express.urlencoded({ limit: "50mb", extended: true }));

// 4 log dei parametri get e post
app.use("/", (req: any, res: any, next: any) => {
  // parametri get .query, post .body
  if (Object.keys(req.query).length != 0) {
    console.log("---> Parametri GET: " + JSON.stringify(req.query));
  }
  if (Object.keys(req.body).length != 0) {
    console.log("---> Parametri BODY: " + JSON.stringify(req.body));
  }
  next();
});
app.use("/", cors(corsOptions));

// Apertura della connessione
app.use("/api/", (req: any, res: any, next: any) => {
  let connection = new MongoClient(connectionString);
  connection
    .connect()
    .catch((err: any) => {
      res.status(503);
      res.send("Errore di connessione al DB");
    })
    .then((client: any) => {
      req["client"] = client;
      next();
    });
});

/***********USER LISTENER****************/
app.get("/api/users", (req: any, res: any, next: any) => {
  let connection = new MongoClient(connectionString as string);
  connection.connect().then((client: MongoClient) => {
  let collection = client.db(DBNAME).collection("users");
    let request = collection.find().project({_id:0}).toArray()
    request.then((data:any)=>{
      res.status(200);
      res.send(data);
    }).catch((err: Error) => {
      res.status(500);
      res.send("Query error " + err.message);
      console.log(err.stack);
    }).finally(() => {
      client.close();
    });

  }).catch((err: Error) => {
    res.status(503);
    res.send("Database service unavailable");
  })
});



/***********DEFAULT ROUTE****************/

app.use("/", (req: any, res: any, next: any) => {
  res.status(404);
  if (req.originalUrl.startsWith("/api/")) {
    res.send("API non disponibile");
    req.client.close();
  } else {
    res.send(paginaErrore);
  }
});

app.use("/", (err: any, req: any, res: any, next: any) => {
  if (req.client) {
    req.client.close();
  }
  console.log("SERVER ERROR " + err.stack);
  res.status(500);
  res.send(err.message);
});