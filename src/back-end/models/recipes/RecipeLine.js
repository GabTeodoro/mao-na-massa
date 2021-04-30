const mongoose = require("mongoose");

const RecipeLineSchema = mongoose.Schema({
    idIngredients: { type: "number", required: true },
    idRecipeHeader: {type: "number", required: true},
    nameProduct: {type: "number", required: true},
    valueUsed: { type: "number", required: true },
    unity: { type: "number", required: true },
    quantity: { type: "number", required: true },
  });

  module.exports = mongoose.model("RecipeLine", RecipeLineSchema);