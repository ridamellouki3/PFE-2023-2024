const mongoose = require("mongoose");
require("dotenv").config()
mongoose.connect(process.env.DBURL);

const conversationSchema = new mongoose.Schema({
    
    serviceProviderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
    },
    readByServiceProvider: {
      type: Boolean,
      required: true,
    },
    readByClient: {
      type: Boolean,
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  })


const Conversation = mongoose.model("Conversation",conversationSchema)

module.exports = Conversation