const mongoose = require("mongoose");

const RecipeHeaderSchema = mongoose.Schema({
    name: { type: "string", required: true },
    productionValue: { type: "number", required: true },
    suggestedPrice: { type: "number", required: true },
    finalPrice: { type: "number", required: true },
    productionDate: { type: "string", required: true },
    percentProfit: { type: "number", required: true },
  });

  module.exports = mongoose.model("RecipeHeader", RecipeHeaderSchema);