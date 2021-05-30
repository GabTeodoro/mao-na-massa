const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
app.use(cors());
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();
const Ingredient = require("../models/ingredients/ingredients");
const mongoose = require("mongoose");

const userDB = process.env.MONGODB_INGREDIENT_USER;
const passwordDB = process.env.MONGODB_INGREDIENT_PASSWORD;
const clusterDB = process.env.MONGODB_INGREDIENT_CLUSTER;
const databaseDB = process.env.MONGODB_INGREDIENT_DATABASE;

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

let allIngredients = [];
const functions = {
}


app.get("/MaoNaMassa/:id", (req, res)=>{
  Ingredient.find({ _id: req.params.id }).then((documents) => {
    res.status(200).json({
      message: "All right",
      ingredients: documents,
    });
  }).catch((err)=>console.log("Erro pegando um ingrediente.\n"+err));
})

app.put("/MaoNaMassa", (req,res)=>{
  const ingred = new Ingredient({
    ingredient: req.body.ingredient,
    quantity: req.body.quantity,
    measurement: req.body.measurement,
    measurementUnit: req.body.measurementUnit,
    expirationDate: req.body.expirationDate,
    price: req.body.price
  })
  res.status(201).send({message:"Tudo certo",id: "123"})
  ingred.save().then((addIngredient) => {
    res.status(201).send({
    message: "Added ingredient",
    id: addIngredient._id,
  });
  }).catch((err)=>console.log("Erro salvando.\nErro: "+err));
})
app.put("/MaoNaMassa/:id", (req,res)=>{
  const ingred = {
    ingredient: req.body.ingredient,
    quantity: req.body.quantity,
    measurement: req.body.measurement,
    measurementUnit: req.body.measurementUnit,
    expirationDate: req.body.expirationDate,
    price: req.body.price
  }
  Ingredient.updateOne({ _id: req.body.id},ingred).then(()=>res.status(201).send({message:"Atualizou!!"})).catch((err)=>console.log("Erro salvando.\nErro: "+err));
})

app.delete("/MaoNaMassa/:id",(req, res)=>{
  try{    
    Ingredient.deleteOne({ _id: req.params.id }).then(() => {
      res.status(200).json({ message: "Deleted ingredient" });
    }).catch((err)=>console.log("Deu erro deletando.\nErro:"+err));
  }catch(erro){
    console.log("Deu erro\n"+erro)
  }
})


app.post("/MaoNaMassa", (req, res)=>{
  try{
    functions[req.body.type](req.body.data)
  }catch{
    console.log("A função " + req.body.type +" não é daqui")
  }
  res.status(200).send({msg:"ok"})
})

app.get("/MaoNaMassa", (req, res)=>{
  Ingredient.find().then((documents) => {
    allIngredients = documents;
    res.status(200).json({
      message: "All right",
      ingredients: documents,
    });
  });
})

app.listen(5000,async ()=>{
  console.log("Ingredientes: Porta 5000")

  const ret = await axios.get(serviceBusURL)

  ret.data.forEach((value)=>{
    try{
      functions[value.type](value.data)
    }catch(err){}
  })
})

