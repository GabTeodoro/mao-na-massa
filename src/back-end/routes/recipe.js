const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipes/Recipe");

router.post("/maoNaMassa/recipe", (req, res, next) => {
  const recipe = new Recipe({
    name: req.body.name,
    lines: req.body.lines,
    suggestedPrice: req.body.suggestedPrice,
    minimumValue: req.body.minimumValue,
    finalPrice: req.body.finalPrice,
    productionDate: req.body.productionDate,
    profitPercentage: req.body.profitPercentage,
  });
  console.log(recipe)
  // Recipe.save().then((addRecipe) => {
  //   res.status(201).json({
  //     message: "Added Recipe",
  //     recipeId: addRecipe.id,
  //     ingredientsId: [addRecipe.lines[0].id]
  //   });
  // });
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
