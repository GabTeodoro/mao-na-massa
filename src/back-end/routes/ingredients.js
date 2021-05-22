const express = require("express");
const app = express();
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();
const Ingredient = require("../models/ingredients/ingredients");
const mongoose = require("mongoose");

const userDB = process.env.MONGODB_INGREDIENT_USER;
const passwordDB = process.env.MONGODB_INGREDIENT_PASSWORD;
const clusterDB = process.env.MONGODB_INGREDIENT_CLUSTER;
const databaseDB = process.env.MONGODB_INGREDIENT_DATABASE;

mongoose
  .connect(`mongodb+srv://${userDB}:${passwordDB}@${clusterDB}/${databaseDB}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Conection OK");
  })
  .catch((err) => {
    console.log("Conection NOK\nError: "+err);
  });


const functions = {
  addIngredient: (ingredient)=>{
    const ingredient = new Ingredient({
      ingredient: '',
      quantity: 0,
      measurement: 0,
      measurementUnit: '',
      expirationDate: '',
      price: 0
    })
    ingredient.save().then((addIngredient) => {
      res.status(201).json({
        message: "Added ingredient",
        id: addIngredient.id,
      });
    });
  }
}

// app.post("/MaoNaMassa", (req, res, next) => {
//   const ingredient = new Ingredient({
//     ingredient: req.body.ingredient,
//     quantity: req.body.quantity,
//     measurement: req.body.measurement,
//     measurementUnit: req.body.measurementUnit,
//     expirationDate: req.body.expirationDate,
//     price: req.body.price,
//   });
//   ingredient.save().then((addIngredient) => {
//     res.status(201).json({
//       message: "Added ingredient",
//       id: addIngredient.id,
//     });
//   });
// });

app.get("/MaoNaMassa", (req, res, next) => {
  Ingredient.find().then((documents) => {
    res.status(200).json({
      message: "All right",
      ingredients: documents,
    });
  });
});

app.delete("/MaoNaMassa/:id", (req, res, next) => {
  Ingredient.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Deleted ingredient" });
  });
});

app.listen(5000,()=>console.log("Ingredientes: Porta 5000"))
