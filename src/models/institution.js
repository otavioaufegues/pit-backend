const mongoose = require("mongoose");

const InstitutionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Institution", InstitutionSchema);
