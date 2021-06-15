const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
app.use(cors());
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();
const ItemsProduced = require("../models/ItemsProduced/itemsProduced");
const filter = require('../models/filter/filter');

const mongoose = require("mongoose");

const userDB = process.env.MONGODB_ITEMSPRODUCED_USER;
const passwordDB = process.env.MONGODB_ITEMSPRODUCED_PASSWORD;
const clusterDB = process.env.MONGODB_ITEMSPRODUCED_CLUSTER;
const databaseDB = process.env.MONGODB_ITEMSPRODUCED_DATABASE;

const eventBusURL = 'http://localhost:3000/MaoNaMassa';
const ObjectId = require('mongodb').ObjectID;

const functions = {

}

mongoose
  .connect(`mongodb+srv://${userDB}:${passwordDB}@${clusterDB}/${databaseDB}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Conection OK");
  })
  .catch((err) => {
    console.log("Conection NOK\nError: "+err);
  });

app.put("/MaoNaMassa", (req, res, next) => {
  const itemsProduced = new ItemsProduced({
    quantity: req.body.quantity,
    name: req.body.name,
    userId: req.body.userId,
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
  }).catch((err)=>{console.log("Erro salvando.\nErro: "+err)});
});

app.put("/MaoNaMassa/:id", (req, res, next) => {

  const items = {
    quantity: req.body.quantity,
    name: req.body.name,
    productionDate: req.body.productionDate,
    expirationDate: req.body.expirationDate,
    costValue: req.body.costValue,
    totalValue: req.body.totalValue,
  };
  ItemsProduced.updateOne({ _id: req.params.id},items)
  .then(()=>res.status(201).send({message:"Atualizou!!"}))
  .catch((err)=>console.log("Erro salvando.\nErro: "+err))
});

app.get("/MaoNaMassa", (req, res, next) => {
    ItemsProduced.find().then((documents) => {
    res.status(200).json({
      message: "All right",
      itemsProduced: documents,
    });
  });
});

app.get("/MaoNaMassa/:id", (req, res, next) => {
  ItemsProduced.find({_id: req.params.id}).then((documents) => {
    res.status(200).json({
      message: "All right",
      itemProduced: documents[0],
    });
  });
});

app.get("/MaoNaMassa/User/:id", (req, res, next) => {
  ItemsProduced.find({userId: req.params.id}).then((documents) => {
    res.status(200).json({
      message: "All right",
      itemsProduced: documents,
    });
  });
});

app.delete("/MaoNaMassa/:id", (req, res, next) => {
  ItemsProduced.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({ message: "Deleted Items Produced" });
  }).catch((err)=>console.log("Erro deletando.\nErro: "+err));
});

app.post("/MaoNaMassa", (req, res, next) => {
  
  try{
    functions[req.body.type](req.body.data)
  }catch(err){
  }
  res.send({msg:'ok'}).status(201)

});

app.listen(7000,async ()=>{
  console.log("Itens produzidos: Porta 7000")
  try{
    const ret = await axios.get(eventBusURL)
    .catch(()=>{})
  
    ret.data.forEach((value, index)=>{
      try{
        functions[value.type](value.data)
      }catch(err){}
    })
  }catch{}
})
