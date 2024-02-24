const mongoose = require("mongoose");
require("dotenv").config()
mongoose.connect(process.env.DBURL);

const serviceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  totalStars: {
    type: Number,
    default: 0,
  },
  starNumber: {
    type: Number,
    default: 0,
  },
  categorieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorie',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },

  sales: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true,
});


const Service = mongoose.model("Service",serviceSchema);

module.exports = Service;