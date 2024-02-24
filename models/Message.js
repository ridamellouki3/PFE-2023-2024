const mongoose = require("mongoose");
require("dotenv").config()
mongoose.connect(process.env.DBURL);

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: String,
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