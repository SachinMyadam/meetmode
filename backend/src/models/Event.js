const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  location: String,
  date: String,
  tags: [String],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Event", EventSchema);
