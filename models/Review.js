const mongoose = require("mongoose");
require("dotenv").config()
mongoose.connect(process.env.DBURL);


const reviewSchema = new mongoose.Schema( {
    serviceId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
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
  