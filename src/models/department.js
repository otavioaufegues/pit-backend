const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    year: { type: mongoose.Schema.Types.ObjectId, ref: "Year" },
    coordinator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", DepartmentSchema);
