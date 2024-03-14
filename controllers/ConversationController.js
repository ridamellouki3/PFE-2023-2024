const { isValidObjectId } = require("mongoose");
const Conversation = require("../models/Conversation");

const createConversation = async (req, res) => {
  try {
    const newConversation = new Conversation({
      serviceProviderId:
        req.role == "Service Provider" ? req.userId : req.body.to,
      clientId: req.role == "client" ? req.userId : req.body.to,
      readByServiceProvider: req.role == "Service Provider",
      readByClient: req.role == "client",
    });

    const savedConversation = await newConversation.save();
    return res.status(201).json({success :savedConversation});
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({error:err.message});
  }
};

const getSingleConversation = async (req, res) => {
  try {
    if (isValidObjectId(req.params.id)) {
      const conversation = await Conversation.find(
        req.role == "Service Provider"
          ? { serviceProviderId: req.userId, _id: req.params.id }
          : { clientId: req.userId, _id: req.params.id }
      );

      if (!conversation) {
        return res.status(404).
        json({error:"Not found"});
      }
      return res.status(200).send({success:conversation});
    } else {
      throw Error("This is Not A Valid ObjectId");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({error:err.message});
  }
};

const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find(
      req.role == "Service Provider"
        ? { serviceProviderId: req.userId }
        : { clientId: req.userId }
    ).sort({ updatedAt: -1 });
    return res.status(200).send({success:conversations});
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({error:err.message});
  }
};
module.exports = {
  createConversation,
  getSingleConversation,
  getConversations,
};
