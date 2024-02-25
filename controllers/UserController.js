const { isValidObjectId } = require('mongoose')
const User = require('../models/User') 
const validator = require("validator")

// 1. delete a user .??
//2.verify taa3 email with mailer ...
//get user Profile 
const userPofile = async (req,res)=>{

    try {
        const user = await User.findOne({ _id : req.userId });
        return res.status(201).json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message)
    }
}

const createUser = async (req,res)=>{
    if(req.role !== 'Manager' ){
        return res.status(404).json("Only Managers can create A User ");
    }

    try{
        
        if(!validator.isEmail(req.body.email)){
            throw Error('This is not a valid Email!');
        }
        if(!validator.isStrongPassword(req.body.password)){
            throw Error('This is not a valid Password !!');
        }
        
        if(!req.file){
            return res.status(404).json("You should upload an image!!");
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password, salt);
        const user = await User.create({
          ...req.body,
          password: hashedpass,
          img: req.file.filename,
          role : "Service Provider",
          managerId : req.userId
        });
        console.log(user);
        return res.status(201).json("You are create a Service Provider successfully")
        
    }catch(error){
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

const deleteUser = async(req,res)=>{

    if(req.role =='Client'){

    }

}



module.exports = {
    userPofile,createUser,deleteUser
}


