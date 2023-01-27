const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    token: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 30*24*60, //30 days in minutes
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tokens", tokenSchema);
