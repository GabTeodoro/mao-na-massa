const mongoose = require("mongoose");

const itemsProducedSchema = new mongoose.Schema({
  id: { type: "string", required: false },
  userId: { type: "string", required: true},
  name: { type: "string", required: true},
  quantity: { type: "number", required: true },
  productionDate: { type: "string", required: true },
  expirationDate: { type: "string", required: true},
  costValue: { type: "number", required: true },
  totalValue: { type: "number", required: true },
},{ collection: 'itemsProduced' });

module.exports = mongoose.model("itemsProduced", itemsProducedSchema);
