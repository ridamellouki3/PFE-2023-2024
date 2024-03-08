const mongoose = require("mongoose");
require("dotenv").config()
mongoose.connect(process.env.DBURL);

const tokenSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:"true",
        unique:true
    },
    token:{
        type:String,
        required:true
    },
},{timestamps:true})

const Token = mongoose.model("Token",tokenSchema);

module.exports = Token;