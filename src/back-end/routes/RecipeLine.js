const express = require("express");
const router = express.Router();
const RecipeLine = require("../models/recipes/RecipeLine");

router.post("/maoNaMassa", (req, res, next) => {
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

router.get("/maoNaMassa", (req, res, next) => {
  RecipeLine.find().then((documents) => {
    res.status(200).json({
      message: "All right",
      RecipeLine: documents,
    });
  });
});

router.delete("/maoNaMassa/:id", (req, res, next) => {
  RecipeLine.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Deleted Recipe" });
  });
});

module.exports = router;
