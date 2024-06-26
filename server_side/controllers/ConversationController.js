const { isValidObjectId } = require("mongoose");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message")

const createConversation = async (req, res) => {
  try {
    const findConversation = await Conversation.find({
      serviceProviderId:(req.role === "Service Provider" ? req.userId : req.body.to),
      clientId: (req.role === "Client" ? req.userId : req.body.to ),
    });
    if (findConversation.length !== 0) {
      return res.status(201).json({ success: findConversation });
    } else {
      const newConversation = new Conversation({
        serviceProviderId:
          req.role === "Service Provider" ? req.userId : req.body.to,
        clientId: req.role === "Client" ? req.userId : req.body.to,
        readByServiceProvider: req.role == "Service Provider",
        readByClient: req.role == "Client",
      });
      console.log(newConversation);
      const savedConversation = await newConversation.save();
      return res.status(201).json({ success: savedConversation });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
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
    )
      .sort({ updatedAt: -1 })
      .populate({
        path: req.role == "Service Provider" ? "clientId" : "serviceProviderId",
        select: " username email gender img country verified ",
      });
    return res.status(200).send({ success: conversations });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

const deleteConverstion = async (req,res)=>{
  try{
    const conversation = await Conversation.findByIdAndDelete( req.params.id)
    if(conversation){
      const messages = await Message.deleteMany({conversationId :conversation._id })
      return res.status(201).json({success : "Conversation deleted successfully !"});
    }else{
      return res.status(404).json({error : "No Conversation Found !!"})
    }
  }catch(error){
    console.log(error.message);
    return res.status(501).json({error : error.message})
  }
};


module.exports = {
  createConversation,
  getSingleConversation,
  getConversations,
  deleteConverstion,
};
