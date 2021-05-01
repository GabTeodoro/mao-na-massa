const express = require("express");
const router = express.Router();
const RecipeHeader = require("../models/recipes/RecipeHeader");

router.post("/maoNaMassa", (req, res, next) => {
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

router.get("/maoNaMassa", (req, res, next) => {
  RecipeHeader.find().then((documents) => {
    res.status(200).json({
      message: "All right",
      RecipeHeader: documents,
    });
  });
});

router.delete("/maoNaMassa/:id", (req, res, next) => {
  RecipeHeader.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Deleted Recipe" });
  });
});

module.exports = router;
