const mongoose = require("mongoose");
require("dotenv").config()
mongoose.connect(process.env.DBURL);


const reviewSchema = new mongoose.Schema( {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    star: {
      type: Number,
      required: true,
      enum:[1,2,3,4,5]
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  });

  const Review = mongoose.model("Review",reviewSchema);

  module.exports = Review ;
  