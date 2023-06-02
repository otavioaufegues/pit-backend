const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: "Description is required",
    },

    axis: { type: mongoose.Schema.Types.ObjectId, ref: "Axis" },

    limitHours: mongoose.Schema.Types.Number,

    details: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
