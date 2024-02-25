const Review = require("../models/Review");
const Service = require("../models/Service")

const createReview = async (req, res) => {
  if (req.role =="Service Provider" ){
    return res.status(403).json( "Service Providers can't create a review!");}

  try {
    const review = await Review.findOne({
      serviceId: req.body.serviceId,
      userId: req.userId,
    });

    if (review){
      return res.status(403).json( "You have already created a review for this Service!")}
        else{
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
          
              return res.status(201).send(savedReview);
        }

   
  } catch (error) {
    console.log(error.message)
    return res.status(500).json(error.message);    
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ serviceId: req.params.serviceId });
    return res.status(200).send(reviews);
  } catch (error) {
    console.log(error.message)
    return res.status(500).json(error.message);  
  }
};


const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if(review){
      if(review.userId !== req.userId){
        return res.status(403).json("You can delete only your Service!")
      }
        const service = await Service.findByIdAndUpdate(review.serviceId,{
            $inc:{totalStars: -review.star , starNumber: -1 }
        });
        await review.remove();
        return res.status(200).send("Review deleted successfully");
    }else{
        return res.status(404).send("review not found");
    }
  } catch (error) {
    console.log(error.message)
    return res.status(500).json(error.message);  
  }
};

module.exports = {
    createReview,getReviews,deleteReview
}