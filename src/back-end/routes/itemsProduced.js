const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
app.use(cors());
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();
const ItemsProduced = require("../models/ItemsProduced/itemsProduced");

const mongoose = require("mongoose");

const userDB = process.env.MONGODB_ITEMSPRODUCED_USER;
const passwordDB = process.env.MONGODB_ITEMSPRODUCED_PASSWORD;
const clusterDB = process.env.MONGODB_ITEMSPRODUCED_CLUSTER;
const databaseDB = process.env.MONGODB_ITEMSPRODUCED_DATABASE;

const serviceBusURL = 'http://localhost:3000/MaoNaMassa';
const ObjectId = require('mongodb').ObjectID;

mongoose
  .connect(`mongodb+srv://${userDB}:${passwordDB}@${clusterDB}/${databaseDB}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Conection OK");
  })
  .catch((err) => {
    console.log("Conection NOK\nError: "+err);
  });

app.post("/MaoNaMassa", (req, res, next) => {
  const itemsProduced = new ItemsProduced({
    RecipeId: req.body.RecipeId,
    quantity: req.body.quantity,
    productionDate: req.body.productionDate,
    expirationDate: req.body.expirationDate,
    costValue: req.body.costValue,
    totalValue: req.body.totalValue,
  });
  itemsProduced.save().then((additemsProduced) => {
    res.status(201).json({
      message: "Added items Produced",
      id: additemsProduced.id,
    });
  });
});

app.get("/MaoNaMassa", (req, res, next) => {
    ItemsProduced.find().then((documents) => {
    res.status(200).json({
      message: "All right",
      itemsProduced: documents,
    });
  });
});

app.delete("/MaoNaMassa/:id", (req, res, next) => {
    ItemsProduced.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Deleted Items Produced" });
  });
});

app.listen(6000,async ()=>{
    console.log("Itens produzidos: Porta 6000")
})
