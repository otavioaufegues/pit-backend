const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, required: "Conteúdo é obrigatório" },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  year: { type: mongoose.Schema.Types.ObjectId, ref: "Year" },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
