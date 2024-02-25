const Order = require("../models/order")
const Service = require("../models/Service")
require("dotenv").config()
const Stripe = require("stripe")(process.env.STRIPE_KEY)


//create a payment intent;



const intent = async (req, res) => {
  const service = await Service.findById(req.params.id);
  const paymentIntent = await Stripe.paymentIntents.create({
    amount: service.price,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
   if (!moment(req.body.date).isValid()) {
    throw new Error('Invalid date format');
  }
  
  const newOrder = new Order({
    serviceId: service._id,
    img: service.cover,
    title: service.title,
    clientId: req.userId,
    serviceProviderId: service.userId,
    price: service.price,
    time:new Date(req.body.date),
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();

  return res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};


const getOrders = async (req, res) => {
  try {
    
    const orders = await Order.find({
      ...(req.role =='Service Provider' ? { serviceProviderId: req.userId } : { clientId: req.userId })
    },{createdAt:-1});

    return res.status(200).send(orders);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
}



const confirm = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate( req.body._id,
      {
        $set: {
          isCompleted: true,
        },
      }
    );
    const service = await Service.findByIdAndUpdate(order.serviceId,{$inc:{sales:1}})

    return res.status(200).json("Order is confirmed.");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};
const completeOrder = async (req,res)=>{
  try{
    const order = await Order.findByIdAndUpdate(
      req.body._id,{
        $set:{isCompleteService:true}
      }
    )
      return res.status(201).json("You complete this order successfully")
  }catch(error){
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}



module.exports = {
    intent,getOrders,confirm,completeOrder
}