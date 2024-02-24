const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.DBURL);

const categorieschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true}) 


const Categorie = mongoose.model('Categorie',categorieschema);

module.exports = Categorie
