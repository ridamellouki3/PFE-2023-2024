const Review = require("../models/Review");
const Service = require("../models/Service")

const createReview = async (req, res, ) => {
  if (req.isSeller){
    return res.status(403).json( "Sellers can't create a review!");}

  try {
    const review = await Review.findOne({
      serviceId: req.body.serviceId,
      userId: req.userId,
    });
    if (review){
      return res.status(403).json( "You have already created a review for this Service!")}
        else{
            const newReview = await new Review({
                userId: req.userId,
                serviceId: req.body.serviceId,
                desc: req.body.desc,
                star: req.body.star,
              });
              const savedReview = await newReview.save();
              await Service.findByIdAndUpdate(req.body.serviceId, {
                $inc: { totalStars: req.body.star, starNumber: 1 },
              });
          
              return res.status(201).send(savedReview);
        }

   
  } catch (err) {
    console.log(err.message)
    return res.status(500).json(err.message);    
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ serviceId: req.params.serviceId });
    res.status(200).send(reviews);
  } catch (err) {
    console.log(err.message)
    return res.status(500).json(err.message);  
  }
};


const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if(review){
      if(review.userId !== req.userId){
        return res.status(403).json("You can delete only your Service!")
      }
        const service = await Service.findByIdAndUpdate(review.service_id,{
            $inc:{totalStars: -review.star , starNumber: -1 }
        });
        await review.remove();
        return res.status(200).send("Review deleted successfully");
    }else{
        return res.status(404).send("review not found");
    }
  } catch (err) {
    console.log(err.message)
    return res.status(500).json(err.message);  
  }
};

module.exports = {
    createReview,getReviews,deleteReview
}