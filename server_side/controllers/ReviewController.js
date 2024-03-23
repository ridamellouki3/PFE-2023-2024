const Review = require("../models/Review");
const Service = require("../models/Service");

const createReview = async (req, res) => {
  if (req.role == "Service Provider") {
    return res.status(403).json("Service Providers can't create a review!");
  }
  console.log(req.body.serviceId)
  try {
    const review = await Review.findOne({
      serviceId: req.body.serviceId,
      userId: req.userId,
    });

    if (review) {
      return res
        .status(403)
        .json({error:"You have already created a review for this Service!"});
    } else {
      const newReview = new Review({
        userId: req.userId,
        serviceId: req.body.serviceId,
        desc: req.body.desc,
        star: req.body.star,
      });
      const savedReview = await newReview.save();
      await Service.findByIdAndUpdate(req.body.serviceId, {
        $inc: { totalStars: req.body.star, starNumber: 1 },
      });

      return res.status(201).send({success:"Review created successfully"});
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({error:error.message});
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ serviceId: req.params.serviceId }).populate({
      path:'userId',
      select:'username img createdAt',
    });
    return res.status(200).send({reviews:reviews});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({error:error.message});
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      if (review.userId.toString() !== req.userId) {
        return res.status(403).json({error:"You can delete only your Review!"});
      }
      const service = await Service.findByIdAndUpdate(review.serviceId, {
        $inc: { totalStars: -review.star, starNumber: -1 },
      });
      await review.deleteOne();
      return res.status(200).send({success:"Review deleted successfully"});
    } else {
      return res.status(404).send({error:"review not found"});
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({error:error.message});
  }
};

module.exports = {
  createReview,
  getReviews,
  deleteReview,
};
