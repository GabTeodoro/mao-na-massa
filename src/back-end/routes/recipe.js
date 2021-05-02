const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
const Recipe = require("../models/recipes/Recipe");
const mongoose = require("mongoose");
const axios = require('axios');

const userDB = process.env.MONGODB_RECIPE_USER;
const passwordDB = process.env.MONGODB_RECIPE_PASSWORD;
const clusterDB = process.env.MONGODB_RECIPE_CLUSTER;
const databaseDB = process.env.MONGODB_RECIPE_DATABASE;
const serviceBusURL = 'http://localhost:10000/MaoNaMassa'

mongoose
  .connect(`mongodb+srv://${userDB}:${passwordDB}@${clusterDB}/${databaseDB}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Conection OK");
  })
  .catch((err) => {
    console.log("Conection NOK\nError: "+err);
  });

const functions = {
  createdRecipe: (recipe)=>{
    console.log("Cadastrou a receita!!!!!!!!!!")
  },
  createRecipe: (recipe) =>{
    console.log(recipe)
    // recipe.save().then(document =>{
    //   axios.post(serviceBusURL,{
    //     type: 'createdRecipe',
    //     data: recipe
    //   })
    // })
  },

  getRecipes: ()=>{
    Recipe.find().then((documents) => {
      axios.post(serviceBusURL,{
        type: 'returnAllRecipes',
        data: documents
      })
    });
  },

  deleteRecipe: (id)=>{
    Recipe.deleteOne({ _id: id }).then((result) => {
      console.log(result);
      axios.post(serviceBusURL,{
        type: 'deletedRecipe',
        data: { message: "Deleted Recipe" }
      })
    });
  }
}


app.post("/MaoNaMassa", (req, res, next) => {
  
  try{
    functions[req.body.type](req.body.data)
  }catch(err){

  }
  res.send({msg:ok}).status(201)
  // Recipe.save().then((addRecipe) => {
  //   res.status(201).json({
  //     message: "Added Recipe",
  //     id: addRecipe.id
  //   });
  // });
});

app.get("/MaoNaMassa", (req, res, next) => {
  try{
    functions[req.body.type](req.body.data)
  }catch(err){

  }
  res.send({msg:ok}).status(201)
});

app.delete("/MaoNaMassa/:id", (req, res, next) => {
  try{
    functions[req.body.type](req.body.data)
  }catch(err){

  }
  res.send({msg:ok}).status(201)
});

app.listen(4000,async()=>{
  
  console.log("Receitas: porta 4000")

  const ret = await axios.get(serviceBusURL)

  ret.data.forEach((value, index)=>{
    try{
      console.log(value.type)
      functions[value.type](value.data)
    }catch(err){

    }
  })
})
