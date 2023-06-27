const Message = require("../models/message");
const User = require("../models/user");

exports.getUserMessages = async function (req, res) {
  const { user } = req;
  const { yearId, userId } = req.params;

  try {
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    const messages = await Message.find({
      $and: [
        {
          $or: [
            { sender: user._id, receiver: userId },
            { sender: userId, receiver: user._id },
          ],
        },
        { year: yearId },
      ],
    })
      .populate("sender")
      .populate("receiver");

    res.status(200).json({ messages: messages });
  } catch (error) {
    console.error("Erro ao buscar mensagens do usuário:", error);
    res.status(500).json({ message: "Erro ao buscar mensagens do usuário" });
  }
};

exports.createMessages = async function (req, res) {
  const { user } = req;
  const receiverId = req.body.receiver;
  const content = req.body.content;
  const year = req.body.year;
  try {
    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({ message: "Destinatário não encontrado" });
    }

    const newMessage = new Message({
      sender: user._id,
      receiver: receiverId,
      content: content,
      timestamp: Date.now(),
      isRead: false,
      isArchived: false,
      year: year,
    });

    await newMessage.save();

    res
      .status(201)
      .json({ message: "Mensagem criada com sucesso", newMessage });
  } catch (error) {
    console.error("Erro ao inserir mensagens do usuário:", error);
    res.status(500).json({ message: "Erro ao inserir mensagens do usuário" });
  }
};

exports.readMessages = async function (req, res) {
  const { messageId } = req.params;
  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Mensagem não encontrada" });
    }

    message.isRead = true;
    await message.save();

    res
      .status(200)
      .json({ message: "Mensagem marcada como lida", updatedMessage: message });
  } catch (error) {
    console.error("Erro ao marcar mensagem como lida:", error);
    res.status(500).json({ message: "Erro ao marcar mensagem como lida" });
  }
};
