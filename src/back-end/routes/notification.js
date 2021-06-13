const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
app.use(cors());
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();
const Notification = require("../models/notifications/notification");
const filter = require('../models/filter/filter');

const mongoose = require("mongoose");

const userDB = process.env.MONGODB_NOTIFICATION_USER;
const passwordDB = process.env.MONGODB_NOTIFICATION_PASSWORD;
const clusterDB = process.env.MONGODB_NOTIFICATION_CLUSTER;
const databaseDB = process.env.MONGODB_NOTIFICATION_DATABASE;

const eventBusURL = "http://localhost:3000/MaoNaMassa";
const ObjectId = require("mongodb").ObjectID;
const data = {
  type: "makeNotifications",
  data: "",
};
let allNotifications = [];
const functions = {
  onCreatedNotifications: (document) => {
    document.map((line) => {
      const notif = new Notification(line);
      notif.save();
    });
  },
};

mongoose
  .connect(
    `mongodb+srv://${userDB}:${passwordDB}@${clusterDB}/${databaseDB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Conection OK");
  })
  .catch((err) => {
    console.log("Conection NOK\nError: " + err);
  });

app.put("/MaoNaMassa", (req, res, next) => {
  const date = new Date();
  const notif = new Notification({
    message: req.body.message,
    date: date.toISOString(),
    type: req.body.type,
  });
  notif
    .save()
    .then((notifi) => {
      res.status(201).send({ message: "OK", notification: notifi });
    })
    .catch((err) => console.log("Erro salvando.\nErro: " + err));
});

app.get("/MaoNaMassa", (req, res, next) => {
  Notification.find()
    .then((documents) => {
      res.status(201).send({ message: "OK", notifications: documents });
    })
    .catch((err) => console.log("Erro salvando.\nErro: " + err));
});

app.delete("/MaoNaMassa", (req, res, next) => {
  Notification.deleteMany()
    .then((documents) => {
      res.status(201).send({ message: "OK", qtdeDeletados: documents.n });
    })
    .catch((err) => console.log("Erro excluindo.\nErro: " + err));
});

app.post("/MaoNaMassa", (req, res, next) => {
  try {
    functions[req.body.type](req.body.data);
  } catch (err) {}
  res.send({ msg: "ok, created" }).status(201);
  setTimeout(() => {
    axios.post("http://localhost:3000/MaoNaMassa", data).catch((err) => {});
  }, 3600000);
});

app.listen(8000, async () => {
  console.log("Notificações: Porta 8000");
  try {
    const ret = await axios.get(eventBusURL);
    axios.post("http://localhost:3000/MaoNaMassa", data).catch((err) => {});
    ret.data.forEach((value, index) => {
      try {
        functions[value.type](value.data);
      } catch (err) {}
    });
  } catch {}
});
