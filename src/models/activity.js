const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    department: { type: mongoose.Schema.Types.Number, ref: "Department" },

    category: { type: mongoose.Schema.Types.Number, ref: "Category" },

    year: { type: mongoose.Schema.Types.Number, ref: "Year" },

    description: {
      type: String,
      required: "Description is required",
    },

    details: {
      type: Map,
      of: String,
    },

    limitHours: { type: mongoose.Schema.Types.Number, ref: "limitHours" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", ActivitySchema);
