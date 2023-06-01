const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: "Description is required",
    },

    axis: mongoose.Schema.Types.ObjectId,

    limitHours: mongoose.Schema.Types.Number,

    details: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
