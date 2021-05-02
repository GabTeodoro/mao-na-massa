const express = require("express");
const env = require('dotenv');
env.config();
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const ingredientRoutes = require('./routes/ingredients')
const recipeRoutes = require('./routes/recipe')

app.use(express.json());
app.use(cors());

const userDB = process.env.MONGODB_USER;
const passwordDB = process.env.MONGODB_PASSWORD;
const clusterDB = process.env.MONGODB_CLUSTER;
const databaseDB = process.env.MONGODB_DATABASE;

mongoose
  .connect(`mongodb+srv://${userDB}:${passwordDB}@${clusterDB}/${databaseDB}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Conection OK");
  })
  .catch((err) => {
    console.log("Conection NOK\nError: "+err);
  });


// Requisições Ingredientes
app.use('/maoNaMassa', ingredientRoutes)

//Requisições Recipe
app.use('/maoNaMassa/recipe', recipeRoutes)

module.exports = app;
