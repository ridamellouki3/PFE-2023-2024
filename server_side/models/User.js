const mongoose = require("mongoose");
const validator =require('validator')
const bcrypt = require('bcrypt')
require("dotenv").config()
mongoose.connect(process.env.DBURL);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require:false,
  },
  gender:{
    type : String,
    required:true,
    enum : ['Male','Female'],
    default:'Male'
  },
  img: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    //required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: false,
  },
  managerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    require:false
  },
  googleId:{
    type:String,
    require:false
  },
  role:{
    type:String ,
    enum:["Client","Manager","Service Provider"],
    default:"Client"
  },
  verified:{
    type:Boolean,
    default:false,
  }

},{timestamps:true})

userSchema.statics.login =async function (email,password){
  if(!email || !password){
      throw Error('Must fill all fields ');
  }
  if(!validator.isEmail(email)){
      throw Error('Email in not valid')
  }
  const exist = await this.findOne({email})
  if(!exist){
      throw Error('Email Not Found')
  }
      const valid = await bcrypt.compare(password,exist.password)
      if(valid){
          return exist;
      }else{
          throw Error('Wrong password')
      }
  
} 




const User = mongoose.model("User",userSchema);


module.exports = User