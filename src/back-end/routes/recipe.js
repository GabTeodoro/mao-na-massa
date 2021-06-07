const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
const Recipe = require("../models/recipes/Recipe");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
app.use(cors());

const userDB = process.env.MONGODB_RECIPE_USER;
const passwordDB = process.env.MONGODB_RECIPE_PASSWORD;
const clusterDB = process.env.MONGODB_RECIPE_CLUSTER;
const databaseDB = process.env.MONGODB_RECIPE_DATABASE;
const eventBusURL = 'http://localhost:3000/MaoNaMassa'

mongoose
  .connect(`mongodb+srv://${userDB}:${passwordDB}@${clusterDB}/${databaseDB}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Conection OK");
  })
  .catch((err) => {
    console.log("Conection NOK\nError: "+err);
});

app.put('/MaoNaMassa',(req, res)=>{
  const recipe = new Recipe( {
    lines:req.body.lines,
    minimumValue: req.body.minimumValue,
    suggestedPrice: req.body.priceSuggestion,
    productionDate: req.body.productionDate,
    profitPercentage: req.body.profitPercentage,
    finalPrice: req.body.finalPrice,
    name: req.body.name
  })
  recipe.save().then((documents)=>{
    console.log(documents)
    res.status(201).send({message:"Tudo certo",id: documents._id})
  }).catch((err)=>console.log("Erro salvando.\nErro: "+err))
})

app.put('/MaoNaMassa/:id',(req, res)=>{
  const recipe = {
    lines:req.body.lines,
    minimumValue: req.body.minimumValue,
    suggestedPrice: req.body.priceSuggestion,
    productionDate: req.body.productionDate,
    profitPercentage: req.body.profitPercentage,
    finalPrice: req.body.finalPrice,
    name: req.body.name
  }
  Recipe.updateOne({ _id: req.params.id},recipe).then(()=>res.status(201).send({message:"Atualizou!!"})).catch((err)=>console.log("Erro salvando.\nErro: "+err));
})

app.get('/MaoNaMassa',(req, res)=>{
  Recipe.find().then((documents)=>{
    res.status(201).send({message: "OK",recipes:documents});
  })
})

app.get('/MaoNaMassa/:id',(req, res)=>{
  Recipe.find({ _id: req.params.id}).then((documents)=>{
    res.status(201).send({message: "OK",recipe:documents});
  }).catch((err)=>console.log("Erro consultando.\nErro: "+err))
})

app.delete("/MaoNaMassa/:id", (req, res)=>{
  Recipe.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(201).send({message:"Excluído"})
  }).catch((err)=>console.log("Erro deletando.\nErro: "+err));
})
const functions = {

}


app.post("/MaoNaMassa", (req, res, next) => {
  
  try{
    functions[req.body.type](req.body.data)
    console.log(req.body.type)
  }catch(err){}
  res.send({msg:'ok'}).status(201)

});

app.listen(4000,async()=>{
  
  console.log("Receitas: porta 4000")

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
