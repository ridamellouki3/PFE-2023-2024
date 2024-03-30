const User = require("../models/User");
const validator = require("validator");
const Order = require("../models/order");
const Review = require("../models/Review");
const Service = require("../models/Service");
const Token = require("../models/Token");
const bcrypt = require("bcrypt")

const userPofile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    return res.status(201).json({success:user});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({error:error.message});
  }
};

const createUser = async (req, res) => {
  if (req.role !== "Manager") {
    return res.status(404).json("Only Managers can create A User ");
  }
  console.log(req.body)
  try {
    if (!validator.isEmail(req.body.email)) {
      throw Error("This is not a valid Email!");
    }
    if (!validator.isStrongPassword(req.body.password)) {
      throw Error("This is not a valid Password !!");
    }

    if (!req.file) {
      return res.status(404).json("You should upload an image!!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      ...req.body,
      password: hashedpass,
      img: req.file.filename,
      role: "Service Provider",
      managerId: req.userId,
    });
    return res
      .status(201)
      .json("You are create a Service Provider successfully");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  if (req.userId !== req.params.id) {
    return res.status(501).json("YOU CAN DELETE ONLY YOUR ACCOUNT");
  }
  if (req.role === "Client") {
    try {
      const user = await User.findByIdAndDelete(req.userId);
      if (!user) {
        return res.status(405).json("User Not Found");
      }
      return res.status(201).json("User has been deleted successfully");
    } catch (error) {
      console.error(error.message);
      return res.status();
    }
  } else if (req.role === "Service Provider") {
    try {
      const user = await User.findByIdAndDelete(req.userId);
      if (user) {
        const services = (await Service.find({ userId: req.userId })).forEach(
          async (service) => {
            await Order.deleteMany({ serviceId: service._id });
            await Review.deleteMany({ serviceId: service._id });
            await service.deleteOne();
          }
        );
        return req.status(200).json("User has been deleted successfully");
      } else {
        return req.status(404).json("User Not Found");
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  } else {
    try {
      const user = await User.findByIdAndDelete(req.userId);
      if (user) {
        await Review.deleteMany({ userId: user._id });
        (await User.find({ managerId: req.userId })).forEach(async (u) => {
          (await Service.find({ userId: u._id })).forEach(async (service) => {
            await Order.deleteMany({ serviceId: service._id });
            await Review.deleteMany({ serviceId: service._id });
            await service.deleteOne();
          });
          u.deleteOne();
        });
        return req.status(200).json("User has been deleted successfully");
      } else {
        return req.status(404).json("User Not Found");
      }
    } catch (error) {
      console.error(error.message);
      return res.status(501).json(error.message);
    }
  }
};

const deleteByManager = async (req, res) => {
  if (req.role !== "Manager") {
    return res.status(401).json("This is only For Managers");
  }
  try {
    const user = await User.findOne({
      _id: req.params.id,
      managerId: req.userId,
    });
    if (!user) {
      return res.status(401).json("You can Delete Only Your Service Provider");
    }
    (await Service.find({ userId: user._id })).forEach(async (service) => {
      await Order.deleteMany({ serviceId: user._id });
      await Review.deleteMany({ serviceId: user._id });
      service.deleteOne();
    });
    await user.deleteOne();
    return res.status(201).json("User deleted successfully");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json(error.message);
  }
};
const verifyProfile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (user) {
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });

      console.log("THis is your token", token);

      if (!token) {
        return res.status(401).json("Invalid Link ");
      }
      const u = await User.findByIdAndUpdate(user._id, { verified: true });
      console.log(u);
      await token.deleteOne();
      return;
    }
    return res.status(400).json("Invalid Link ");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};



const updateProfile = async (req,res)=>{
  const { gender,pass ,country,phone,desc ,username} = req.body;
  let updates = {};
  try{
    if(username){
    const user = await User.findOne({username : username})
    if(user){
      return res.status(501).json({error:"This username not available !!"})
    }else{
      updates.username = username ;
    }
  }
  if(req.file){
    updates.img = req.file.filename;
  }
  
  if(gender){
    updates.gender = gender ;
  }
  if(pass){
    if(!validator.isStrongPassword(pass)){
      throw Error('Password not strong enough !!');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(pass, salt);
    updates.password = hashedpass ; 
  }
  if(country){
    updates.country = country ;
  }
  if(phone){
    updates.phone = phone
  }
  if(desc){
    updates.desc = desc ;
  }

const user = await User.findByIdAndUpdate( req.userId ,{$set : updates},{new:true})

const  {password, ...info} = user._doc ;
return res.status(201).json({successfull : "Profile updated successfully ",user : info})}catch(err){
  console.log(err.message);
  return res.status(500).json({error:err.message});
}
}

const serviceProviders = async (req,res) => {
if(req.role !=="Manager"){
  return res.status(401).json({error:"Only Manager has The access"})
}
    const page = req.query.p || 0;
    const serviceProviderPerPage = 10;
    const serviceProviders = await User.find({managerId : req.userId}).skip(page*serviceProviderPerPage).limit(serviceProviderPerPage);
    if(serviceProviders.length === 0 ){
      return res.status(404).json({error : "Not found !!"});
    }
    return res.status(201).json({serviceProviders : serviceProviders})
}

module.exports = {
  userPofile,
  createUser,
  deleteUser,
  deleteByManager,
  verifyProfile,
  updateProfile,
  serviceProviders,
};
