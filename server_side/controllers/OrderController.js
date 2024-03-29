const Order = require("../models/order");
const Service = require("../models/Service");
require("dotenv").config();
const moment = require("moment");
const Stripe = require("stripe")(process.env.STRIPE_KEY);

//create a payment intent;
const intent = async (req, res) => {
  try {
    if (req.role !== "Client") {
      return res.status(403).json({ error: "Only clients can pass an order" });
    }

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    const passedDate = moment(req.body.date).toDate();
    if (!moment(passedDate, "YYYY-MM-DD", true).isValid()) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const paymentIntent = await Stripe.paymentIntents.create({
      amount: service.price * 100, // Convert price to cents (if using Stripe in cents)
      currency: "usd",
      payment_method_types: ["card"],
    });

    const newOrder = new Order({
      serviceId: service._id,
      img: service.cover,
      title: service.title,
      clientId: req.userId,
      serviceProviderId: service.userId,
      price: service.price,
      time: passedDate,
      payment_intent: paymentIntent.id,
    });

    await newOrder.save();

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};


const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      ...(req.role === "Service Provider"
        ? { serviceProviderId: req.userId }
        : { clientId: req.userId }),
    }).populate({
      path:(req.role == "Service Provider")?("clientId"):('serviceProviderId'),
      select : " img title price time isCompleteService isConfirmed"
    })
    return res.status(200).json({orders:orders});
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({error:err.message});
  }
};

const confirm = async (req, res) => {
  try {
    if (req.role !== "Service Provider") {
      return res
        .status(500)
        .json({error:"Only Service Provider Can Confirm Thier Orders."});
    }
    const order = await Order.findOne({
      _id: req.params.id,
      isConfirmed: false,
    });
    if (order) {
      if (order.serviceProviderId.toString() !== req.userId) {
        return res.status(401).json({error:"You can Confirm only Your Orders."});
      }
      await order.updateOne({ $set: { isConfirmed: true } });

      return res.status(200).json({success:"Order is confirmed."});
    } else {
      return res.status(404).json({error:"No Order Found!"});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({error:error.message});
  }
};
const completeOrder = async (req, res) => {
  try {
    if (req.role !== "Service Provider" && req.role !=="Manager") {
      return res
        .status(500)
        .json({error:"Only Service Provider and Manager Can Confirm Thier Orders."});
    }
    
    if(req.role ==="Service Provider"){
      const order = await Order.findOneAndUpdate(
        { _id: req.params.id, serviceProviderId: req.userId },
        {
          $set: { isCompleteService: true },
        }
      );
      const service = await Service.findByIdAndUpdate(order.serviceId, {
        $inc: { sales: 1 },
      });
      return res.status(201).json({success:"You complete this order successfully"});
    }else{
      const order = await Order.findOne({_id : req.params.id })
      const serviceProvider = await User.findOne({_id : order.serviceProviderId})

      if(serviceProvider.managerId.toString() !== req.userId ){
        return res.status(401).json({error : "You can confim Only Orders For your Service Providers !!"});
      }else{
        order.updateOne({ $set: { isCompleteService: true }})
        const service = await Service.findByIdAndUpdate(order.serviceId, {
          $inc: { sales: 1 },
        });
        return res.status(201).json({success:"You complete this order successfully"});
      }
    }

    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({error:error.message});
  }
};

module.exports = {
  intent,
  getOrders,
  confirm,
  completeOrder,
};
