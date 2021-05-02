const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipes/Recipe");

router.post("", (req, res, next) => {
  
  let lines = req.body.lines.map(linha =>{
    return linha
  })
  const recipe = new Recipe({
    name: req.body.name,
    lines: lines,
    suggestedPrice: req.body.suggestedPrice,
    minimumValue: req.body.minimumValue,
    finalPrice: req.body.finalPrice,
    productionDate: req.body.productionDate,
    profitPercentage: req.body.profitPercentage,
  });
  // Recipe.save().then((addRecipe) => {
  //   res.status(201).json({
  //     message: "Added Recipe",
  //     id: addRecipe.id
  //   });
  // });
});

router.get("", (req, res, next) => {
  Recipe.find().then((documents) => {
    res.status(200).json({
      message: "All right",
      RecipeHeader: documents,
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Recipe.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Deleted Recipe" });
  });
});

module.exports = router;
