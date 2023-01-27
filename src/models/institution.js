const mongoose = require("mongoose");

const InstitutionSchema = new mongoose.Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: "Name is required",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Institution", InstitutionSchema);
