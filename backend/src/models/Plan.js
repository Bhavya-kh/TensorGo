const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  userLimit: { type: Number, required: true },
  description: { type: String },
  daysValidity: { type: Number, default: 14 },
});

module.exports = mongoose.model("Plan", PlanSchema);
