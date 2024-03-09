const User = require("../models/User");
const validator = require("validator");
const Order = require("../models/order");
const Review = require("../models/Review");
const Service = require("../models/Service");
const Token = require("../models/Token");

const userPofile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const createUser = async (req, res) => {
  if (req.role !== "Manager") {
    return res.status(404).json("Only Managers can create A User ");
  }

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
    const hashedpass = await bcrypt.hash(password, salt);
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

module.exports = {
  userPofile,
  createUser,
  deleteUser,
  deleteByManager,
  verifyProfile,
};
