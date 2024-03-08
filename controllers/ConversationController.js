const { isValidObjectId } = require("mongoose");
const Conversation= require( "../models/Conversation");
const User = require("../models/User") ;


const createConversation = async (req, res) => {
  try {
    const newConversation = new Conversation({
    serviceProviderId: (req.role=="Service Provider") ? req.userId : req.body.to,
    clientId: req.role=="client" ? req.userId : req.body.to,
    readByServiceProvider : (req.role=="Service Provider"),
    readByClient: (req.role=="client"),
  });
    
  const savedConversation = await newConversation.save();
    return res.status(201).json(savedConversation);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err.message)
  }
};

const getSingleConversation = async (req, res) => {
  try {
    if(isValidObjectId(req.params._id)){
      const conversation = await Conversation.find((req.role=="Service Provider") ? { serviceProviderId: req.userId, _id:req.params._id } : { clientId: req.userId ,_id:req.params._id});
        
      if (!conversation) {return res.status(404);json("Not found")}
      return res.status(200).send(conversation);
    } else{
      throw Error("This is Not A Valid ObjectId")
    }
    
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
};

const getConversations = async (req, res) => {
  try {
    
      const conversations = await Conversation.find(
        (req.role=="Service Provider") ? { serviceProviderId: req.userId } : { clientId: req.userId }
      ).sort({ updatedAt: -1 });
      
        return res.status(200).send(conversations);
      
   
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err.message);
  }
};
module.exports = {
  createConversation,
  getSingleConversation,
  getConversations
};
