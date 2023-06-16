const Message = require("../models/message");
const User = require("../models/user");

exports.getUserMessages = async function (req, res) {
  const userId = req.params.userId;
  const year = req.params.year;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const messages = await Message.find({
      $and: [
        { $or: [{ sender: userId }, { receiver: userId }] },
        { year: year },
      ],
    });

    res.status(200).json({ messages: messages });
  } catch (error) {
    console.error("Erro ao buscar mensagens do usuário:", error);
    res.status(500).json({ message: "Erro ao buscar mensagens do usuário" });
  }
};
