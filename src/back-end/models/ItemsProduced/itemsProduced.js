const mongoose = require("mongoose");

const itemsProducedSchema = mongoose.Schema({
  RecipeId: { type: "string", required: true },
  quantity: { type: "number", required: true },
  productionDate: { type: "string", required: true },
  expirationdate: { type: "string", required: true},
  costValue: { type: "number", required: true },
  totalValue: { type: "number", required: true },
});

module.exports = mongoose.model("itemsProduced", itemsProducedSchema);
