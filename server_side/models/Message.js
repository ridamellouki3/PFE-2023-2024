const mongoose = require("mongoose");
require("dotenv").config()
mongoose.connect(process.env.DBURL);

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Conversation",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
},{
  timestamps:true
})

const Message = new mongoose.model("Message",messageSchema);

module.exports = Message