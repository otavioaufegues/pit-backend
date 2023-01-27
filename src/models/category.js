const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    _id: Number,

    description: {
      type: String,
      required: "Description is required",
    },

    axis: { type: mongoose.Schema.Types.Number, ref: "Axis" },

    details: {
      type: Map,
      of: String,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
