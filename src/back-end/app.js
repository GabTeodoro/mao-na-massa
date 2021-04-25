const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
const mongoose = require("mongoose");
const Ingredient = require("./models/ingredients");
// String de conexão

app.use(bodyParser.json());

app.post("", (req, res, next) => {
  const ingredient = new Ingredient({
    ingredient: req.body.ingredient,
    quantity: req.body.quantity,
    measurement: req.body.measurement,
    measurementUnit: req.body.measurementUnit,
    expirationDate: req.body.expirationDate,
    price: req.body.price,
  });
  Ingredient.save().then((addIngredient) => {
    res.status(201).json({
      message: "Added ingredient",
      id: addIngredient.id,
    });
  });
});

app.get("", (req, res, next) => {
  Ingredient.find().then((documents) => {
    res.status(200).json({
      message: "All right",
      ingredients: documents,
    });
  });
});

app.delete("", (req, res, next) => {
  Ingredient.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Deleted ingredient" });
  });
});

module.exports = app;
