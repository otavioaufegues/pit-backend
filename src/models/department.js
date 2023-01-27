const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: "Name is required",
    },
    year: { type: mongoose.Schema.Types.Number, ref: "Year" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", DepartmentSchema);
