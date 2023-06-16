const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: "Conteudo é obrigatório" },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
