const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

//function called to set the cookie
const setCookie = (res, token) => {
  res.cookie("accessToken", token, {
    //httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

const registre = async (req, res) => {
  try {
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({ error: "This is not a valid Email" });
    }
    if (!validator.isStrongPassword(req.body.password)) {
      return res.status(400).json({ error: "password is not strong enough" });
    }
    if (req.file) {
      console.log(req.file);
      //Create a Salt(Random STring) for password hashing
      const salt = await bcrypt.genSalt(10);
      const hashedpass = await bcrypt.hash(req.body.password, salt);
      const user = await User.create({
        ...req.body,
        password: hashedpass,
        img: req.file.filename,
      });
      console.log(user);
      return res.status(201).json("User has been created.");
    } else {
      return res.status(500).json("You should upload an image!!");
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.login(req.body.email, req.body.password);
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const { password, ...info } = user._doc;
    setCookie(res, token);
    return res.status(200).send(info);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

const logout = (req, res) => {
  if(req.user){
    req.logout();
    req.session.destroy();
  }
  const cookies = req.cookies;
  for (const cookieName in cookies) {
    res.clearCookie(cookieName);
  }
  return res.status(200).send("User has been logged out.");
  
};





module.exports = {
  registre,
  login,
  logout,
};
