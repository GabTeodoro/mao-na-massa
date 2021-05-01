const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema({
    name: { type: "string", required: true },
    lines: [
      {id: { type: "string", required: false }},
      {ingredient: { type: "string", required: true}},
      {quantity: { type: "number", required: true}},
      {measurement: { type: "string", required: true}},
      {measurementUnit: { type: "string", required: true}},
      {expirationDate: { type: "string", required: true}},
      {price: { type: "number", required: true}}
    ],
    suggestedPrice: { type: "number", required: true },
    minimumValue: { type: "number", required: true },
    finalPrice: { type: "number", required: true },
    productionDate: { type: "string", required: true },
    profitPercentage: { type: "number", required: true },
  });

  module.exports = mongoose.model("Recipe", RecipeSchema);
  