const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
const mongoose = require("mongoose");
const Ingredient = require("./models/ingredients");
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

app.post("/maoNaMassa", (req, res, next) => {
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

module.exports = app;
