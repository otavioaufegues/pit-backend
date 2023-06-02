const mongoose = require("mongoose");

const AxisSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    ref: {
      type: String,
      required: "Name is required",
    },
    limit: { type: Number, required: "Limit is required" },
    icon: {
      type: String,
      required: "Icon is required",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Axis", AxisSchema);
