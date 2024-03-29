const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const createMessage = async (req, res) => {
  const newMessage = await new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    message: req.body.message,
  });
  try {
    const savedMessage = await newMessage.save();

    await Conversation.findOneAndUpdate(
      { _id: req.body.conversationId },
      {
        $set: {
          readByServiceProvider: req.role === "Sevice Provider",
          readByClient: req.role !== "Sevice Provider",
          lastMessage: req.body.message,
        },
      },
      { new: true }
    );

    return res.status(201).send({success:"message sent successfully"});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({error:error.message});
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id }).sort(
      { createdAt: 1 }
    ).populate({
      path:'userId',
      select : " username email gender img country verified "
    })
    return res.status(200).send({messages:messages});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({error:error.message});
  }
};

module.exports = {
  createMessage,
  getMessages,
};
