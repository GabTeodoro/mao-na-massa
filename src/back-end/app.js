const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
const mongoose = require("mongoose");
const Ingredient = require("./models/ingredients");
const RecipeHeader = require("./models/RecipeHearder");
const RecipeLine = require("./models/RecipeLine");
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.3i7uo.mongodb.net/maoNaMassa?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conection OK");
  })
  .catch(() => {
    console.log("Conection NOK");
  });

app.use(bodyParser.json());

// Requisições Ingredientes
app.post("/maoNaMassa", (req, res, next) => {
  const ingredient = new Ingredient({
    ingredient: req.body.ingredient,
    quantity: req.body.quantity,
    measurement: req.body.measurement,
    measurementUnit: req.body.measurementUnit,
    expirationDate: req.body.expirationDate,
    price: req.body.price,
  });
  ingredient.save().then((addIngredient) => {
    res.status(201).json({
      message: "Added ingredient",
      id: addIngredient.id,
    });
  });
});

app.get("/maoNaMassa", (req, res, next) => {
  Ingredient.find().then((documents) => {
    res.status(200).json({
      message: "All right",
      ingredients: documents,
    });
  });
});

app.delete("/maoNaMassa/:id", (req, res, next) => {
  Ingredient.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Deleted ingredient" });
  });
});


//Requisições Recipe Line

app.post("/maoNaMassa", (req, res, next) => {
  const RecipeLine = new RecipeLine({
    idIngredients: req.body.idIngredients,
    idRecipeHeader: req.body.idRecipeHeader,
    nameProduct: req.body.nameProduct,
    valueUsed: req.body.valueUsed,
    unity: req.body.unity,
    quantity: req.body.quantity,
  });
  RecipeLine.save().then((addRecipeLine) => {
    res.status(201).json({
      message: "Added Recipe",
      id: addRecipeLine.id,
    });
  });
});

app.get("/maoNaMassa", (req, res, next) => {
  RecipeLine.find().then((documents) => {
    res.status(200).json({
      message: "All right",
      RecipeLine: documents,
    });
  });
});

app.delete("/maoNaMassa/:id", (req, res, next) => {
  RecipeLine.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Deleted Recipe" });
  });
});

// Requisições Recipe Header

app.post("/maoNaMassa", (req, res, next) => {
  const RecipeHeader = new RecipeHeader({
    name: req.body.name,
    productionValue: req.body.productionValue,
    suggestedPrice: req.body.suggestedPrice,
    finalPrice: req.body.finalPrice,
    productionDate: req.body.productionDate,
    percentProfit: req.body.percentProfit,
  });
  RecipeHeader.save().then((addRecipeHeader) => {
    res.status(201).json({
      message: "Added Recipe",
      id: addRecipeHeader.id,
    });
  });
});

app.get("/maoNaMassa", (req, res, next) => {
  RecipeHeader.find().then((documents) => {
    res.status(200).json({
      message: "All right",
      RecipeHeader: documents,
    });
  });
});

app.delete("/maoNaMassa/:id", (req, res, next) => {
  RecipeHeader.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Deleted Recipe" });
  });
});

module.exports = app;
