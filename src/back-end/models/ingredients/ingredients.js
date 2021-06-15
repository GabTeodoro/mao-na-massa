const mongoose = require("mongoose");

const ingredientSchema = mongoose.Schema({
  ingredient: { type: "string", required: true },
  userId: { type: "string", required: true },
  quantity: { type: "number", required: true },
  measurement: { type: "string", required: true },
  measurementUnit: { type: "string", required: true },
  expirationDate: { type: "string", required: true },
  price: { type: "number", required: true },
});

module.exports = mongoose.model("Ingredient", ingredientSchema);
