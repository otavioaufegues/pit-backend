const mongoose = require("mongoose");

const YearSchema = new mongoose.Schema(
  {
    _id: Number,
    year: {
      type: Number,
      required: "Year is required",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Year", YearSchema);
