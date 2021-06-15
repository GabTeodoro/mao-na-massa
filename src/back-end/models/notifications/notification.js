const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  id: { type: "string", required: false },
  userId: { type: "string", required: true },
  message: { type: "string", required: true },
  date: { type: "string", required: true },
  type: { type: "string", required: true },
},{ collection: 'notifications' });

module.exports = mongoose.model("Notification", notificationSchema);