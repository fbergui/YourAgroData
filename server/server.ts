"use strict";

import http from "http";
import https from "https";
import url from "url";
import fs from "fs";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { parseUrl } from "query-string";
import nodemailer from "nodemailer";
import { SerialPort } from "serialport";
import { ReadlineParser } from '@serialport/parser-readline'

//#region CONFIG
const HTTP_PORT = process.env.PORT || 1337;
let regexMail = new RegExp(`^$[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$`,"g")
dotenv.config({ path: ".env" });
const app = express();
const connectionString: any = process.env.connectionString;
const MAP_KEY: any = process.env.MAP_KEY;
const auth = JSON.parse(process.env.gmail as string)
const DBNAME = "YAD";
const DURATA_TOKEN = 2000;
const whiteList = ["http://localhost:1337","https://localhost:1338","http://localhost:4200",];
const message = fs.readFileSync("message.html", "utf8");
const corsOptions = {
  origin: function (origin:any, callback:any) {
    if (!origin)
      // browser direct call
      return callback(null, true);
    if (whiteList.indexOf(origin) === -1) {
      var msg = `The CORS policy for this site does not
 allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    } else return callback(null, true);
  },
  credentials: true,
};

function createToken(user: any) {
  let time: any = new Date().getTime()/1000;
  let now = parseInt(time); //Data attuale espressa in secondi
  let payload = {
    iat: user.iat || now,
    exp: now + DURATA_TOKEN,
    _id: user._id,
    username: user.username,
  };
  let token = jwt.sign(payload, privateKey,{algorithm: 'RS256'});//{algorithm: 'RS256'}
  //let token = bcrypt.hashSync(user.username+now,10);
  console.log("Creato nuovo token " + token);
  return token;
}

const HTTPS_PORT = 1338;
const privateKey = fs.readFileSync("keys/privateKey.pem", "utf8");
const certificate = fs.readFileSync("keys/certificate.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };


let port = new SerialPort({path:'\\\\.\\COM4', baudRate: 9600, autoOpen:true});
//serialport-terminal  -p COM4 -b 9600
let parser = port.pipe(new ReadlineParser());
let datoSensore:any;
// Read the port data
port.on("open", () => {
  console.log('serial port open');
  parser.on('data', data =>{
    datoSensore = data;
  });
});

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
//#endregion

//#region MIDDELWARE
// 1 request log
app.use("/", (req: any, res: any, next: any) => {
  console.log(req.method + ": " + req.originalUrl);
  next();
});

// 3 lettura dei parametri POST
app.use("/", express.json({ limit: "50mb" }));
app.use("/", express.urlencoded({ limit: "50mb", extended: true }));

// 5 log dei parametri get e post
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

// 6 Autorizzazioni CORS
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
      req["connessione"] = client;
      next();
    });
});
//#endregion

/***********USER LISTENER****************/
app.post("/api/login", (req: any, res: any, next: any) => {
  let params = req.body;
  let email = req.body.stream.email;
  let password = req.body.stream.password;

  let connection = new MongoClient(connectionString as string);
  connection.connect().then((client: MongoClient) => {

    let collection = req["connessione"].db(DBNAME).collection('users');
    collection.findOne({"email":email}).then((dbUser: any) => {
      if (!dbUser) {
        res.status(401); // user o password non validi
        res.send({ris:"nok"});
      } 
      else {
          //confronto la password
          bcrypt.hash(password, 10, function(err, hash) {})
          bcrypt.compare(password,dbUser.password,(err: Error, ris: Boolean) => {
              if (err) {
                res.status(500);
                res.send("Errore bcrypt " + err.message);
                console.log(err.stack);
              } 
              else {
                  if (!ris) {
                    // password errata
                    res.send({ris:"nok"});
                  } 
                  else {
                    let token = createToken(dbUser);
                    res.setHeader("authorization", token);
                    // Per permettere le richieste extra domain
                    res.setHeader("access-control-exspose-headers","authorization");
                    res.send({ ris: "ok" ,id:dbUser._id, name : dbUser.firstName + " "+ dbUser.lastName});
                  }
              }
            });
      }
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
  });


});

app.post("/api/signin", function (req: any, res: any, next: any){
  let params = req.body;
  let password = req.body.stream.password;

    password = bcrypt.hashSync(password, 10);

    let number= req.body.stream.number;

    if(number == null || number == undefined)
    number = " ";

    let user ={
      firstName: req.body.stream.firstName,
      lastName: req.body.stream.lastName,
      email: req.body.stream.email,
      password: password,
      number: number,      
      confirmed: false,
    }

    let transporter = nodemailer.createTransport({
      "service": "gmail",
      "auth": auth
    });
  
    let msg =  message.replace('__lastName', req.body.stream.lastName)
    .replace("__firstName", req.body.stream.firstName)
    
    let mailOptions = {
      "from": auth.user,
      "to": req.body.stream.email,
      "subject": "Confirmation account YourAgroData",
      // "text": msg,
      "html": msg,
    }
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(500).send("Errore invio mail\n" + err.message);
      }
      else {
        res.send({"ris": "ok mail"});
      }
    })
    console.log(user);
  /*let connection = new MongoClient(connectionString as string);
  connection.connect().then((client: MongoClient) => {*/
  let collection = req["connessione"].db(DBNAME).collection("users");
    let request = collection.insertOne(user)
    request.then((data:any)=>{
      res.status(200);
      res.send({"ris": "ok"});
    }).catch((err: Error) => {
      
      res.send("Query error " + err.message);
      console.log(err.stack);
      res.status(500);
    }).finally(() => {
      req["connessione"].close();
    });

  })

app.get("/api/mapkey", function (req: any, res: any, next: any){
    res.send({"key": MAP_KEY});
});

app.get("/api/:collection/:id", function (req: any, res: any, next: any){
  let id = req.params.id;
  let coll = req.params.collection

  let filter, limit, sort;

  if(coll == "sensorData")
  {
    filter = {idSensor:id}
    limit = 50;
    sort = {time:-1}
  }
  else
  {
    filter = {idUser:id}
    limit = 0;
    sort = {}
  }

  let collection = req["connessione"].db(DBNAME).collection(coll);
  let request = collection.find(filter).toArray()
  request.then((data:any)=>{
    res.status(200);
    res.send(data);
  }).catch((err: Error) => {
    res.send("Query error " + err.message);
    console.log(err.stack);
    res.status(500);
  }).finally(() => {
    req["connessione"].close();
  });

})

app.post("/api/add/:collection/", function (req: any, res: any, next: any){
  let data = req.body.data;
  let coll = req.params.collection;

  let collection = req["connessione"].db(DBNAME).collection(coll);
  let request = collection.insertOne(data)
  request.then((data:any)=>{
    res.status(200);
    res.send(data);
  }).catch((err: Error) => {
    res.send("Query error " + err.message);
    console.log(err.stack);
    res.status(500);
  }).finally(() => {
    req["connessione"].close();
  });

});

app.post("/api/edit/:collection/:id", function (req: any, res: any, next: any){
  let id = req.params.id
  let update = req.body.update;
  let coll = req.params.collection;

  let collection = req["connessione"].db(DBNAME).collection(coll);
  let request = collection.updateOne(id,update)
  request.then((data:any)=>{
    res.status(200);
    res.send(data);
  }).catch((err: Error) => {
    res.send("Query error " + err.message);
    console.log(err.stack);
    res.status(500);
  }).finally(() => {
    req["connessione"].close();
  });

});

app.delete("/api/delete/:collection/:id", function (req: any, res: any, next: any){
  let id = req.params.id
  let coll = req.params.collection;

  let collection = req["connessione"].db(DBNAME).collection(coll);
  let request = collection.deleteOne(id)
  request.then((data:any)=>{
    res.status(200);
    res.send(data);
  }).catch((err: Error) => {
    res.send("Query error " + err.message);
    console.log(err.stack);
    res.status(500);
  }).finally(() => {
    req["connessione"].close();
  });

});


app.post("/api/addDataSensor", function (req: any, res: any, next: any){
  let  atmHumidity= parseFloat(datoSensore.split("|")[0]);
  let atmTemperature = parseFloat(datoSensore.split("|")[1]);
  let soilHumidity = parseInt(datoSensore.split("|")[2]);
  console.log(atmTemperature, atmHumidity, soilHumidity);
  let currentTime = new Date() ;

  let record ={
    idSensor: req.body.stream.idSensor,
    atmTemperature: atmTemperature,
    atmHumidity: atmHumidity,
    soilHumidity: soilHumidity,
    time: currentTime
  }

  let collection = req["connessione"].db(DBNAME).collection("sensorData");
  let request = collection.insertOne(record)
  request.then((data:any)=>{
    res.status(200);
    res.send({"ris": "ok"});
  }).catch((err: Error) => {
    res.send("Query error " + err.message);
    console.log(err.stack);
    res.status(500);
  }
  ).finally(() => {
    req["connessione"].close();
  });

})


//#region DEFAULT
/***********DEFAULT ROUTE****************/

app.use("/", (req: any, res: any, next: any) => {
  res.status(404);
  if (req.originalUrl.startsWith("/api/")) {
    res.send("API non disponibile");
    req["connessione"].close();
  } else {
    res.send(paginaErrore);
  }
});

app.use("/", (err: any, req: any, res: any, next: any) => {
  if (req.client) {
    req["connessione"].close();
  }
  console.log("SERVER ERROR " + err.stack);
  res.status(500);
  res.send(err.message);
});
//#endregion