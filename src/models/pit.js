const mongoose = require("mongoose");

const PitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dt_inicial: {
    type: Date,
    required: true,
  },
  dt_final: {
    type: Date,
    required: true,
  },
  teaching: {
    type: Number,
    required: true,
  },
  researching: {
    type: Number,
    required: true,
  },
  extension: {
    type: Number,
    required: true,
  },
  management: {
    type: Number,
    required: true,
  },
  leave: {
    type: Number,
    required: true,
  },
  year: { type: mongoose.Schema.Types.ObjectId, ref: "Year" },
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Pit", PitSchema);
