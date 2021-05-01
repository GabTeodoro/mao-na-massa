const express = require("express");
const router = express.Router();
const Ingredient = require("../models/ingredients/ingredients");

router.post("/maoNaMassa", (req, res, next) => {
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

router.get("/maoNaMassa", (req, res, next) => {
  Ingredient.find().then((documents) => {
    res.status(200).json({
      message: "All right",
      ingredients: documents,
    });
  });
});

router.delete("/maoNaMassa/:id", (req, res, next) => {
  Ingredient.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Deleted ingredient" });
  });
});

module.exports = router;
