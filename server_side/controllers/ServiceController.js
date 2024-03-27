const Service = require("../models/Service");
const Order = require("../models/order");
const Categorie = require("../models/Categorie");
const Review = require("../models/Review");
const { isValidObjectId } = require("mongoose");
const { ObjectId } = require("bson");

const createService = async (req, res) => {
  if (req.role !== "Service Provider" && req.role !== "Manager") {
    return res.status(403).json({error:"Only Service Provider can create a Service!"});
  }
  if (!req.file) {
    return res.status(403).json({error:"You should upload cover for your Service !!"});
  }
  console.log(req.file);
  const categorie = await Categorie.findOne({ _id:new ObjectId(req.body.categorie)  });  console.log(categorie);
  if (!categorie) {
    return res.status(403).json({error:"There is no Categorie with this name !!!"});
  }
  try {
    const newService = new Service({
      ...req.body,
      userId: (req.userId=='Service Provider')? req.userId : req.body.userId,
      categorieId: categorie._id,
      cover: req.file.filename,
    });
    await newService.save();
    return res.status(201).json({success:"Service added successfully"});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({error:error.message});
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({error:"service Not found!!"});
    }
    if (service.userId.toString() !== req.userId) {
      return res.status(403).json({error:"You can delete only your Service!"});
    }
    await Review.deleteMany({ serviceId: service._id });
    await Order.deleteMany({ serviceId: service._id });
    await service.deleteOne();
    return res.status(200).send({success:"Service has been deleted!"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error:error.message});
  }
};
const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate({
      path:'userId',
      select:'username email gender img country verified',
    }).populate({path:'categorieId',select:'name'});
    if (!service) {
      res.status(404).json({error:"Service not found!"});
    }
    return res.status(200).send({service:service});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({error:error.message});
  }
};

//This is FOR A USER IF HE NEED TO SEARCH ABOUT A SERVICE

const filterServices = async (req, res) => {
  try {
    const { userId, categorieName, min, max, sort } = req.query;
    if (!isValidObjectId(userId)) {
      return res.status(501).json({error:"This Is Not A Valid Object Id"});
    }
    let filters = {};

    if (categorieName) {
      const categorie = await Categorie.findOne({ name: categorieName });
      if (!categorie) {
        return res.status(403).json({error:"There is no Categorie with that name !!!"});
      }

      filters.categorieId = categorie._id;
    }

    if (userId) {
      filters.userId = new ObjectId(userId);
    }

    if (min || max) {
      filters.price = {};
    }
    if (min) {
      filters.price.$gte = Number(min);
    }
    if (max) {
      filters.price.$lte = Number(max);
    }
    const sortOptions = sort ? { [sort]: -1 } : {};
    const services = await Service.find(filters).sort(sortOptions).populate({
      path:'userId',
      select:'username email gender img country verified',
    }).populate({path:'categorieId',select:'name'});
    if(services){
      return res.status(200).send({services:services});
    }
    return res.status(404).send({error:'Not Found!'});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({error:error.message});
  }
};

const ServicesByCategorie = async (req,res)=>{
  try{
    const page = req.query.p || 0;
    const servicePerPage = 10;
    const categorieId = req.params ;
    const categorie = await Categorie.findById(new ObjectId(categorieId));
  if(categorie){
    const services = await Service.find({categorieId : categorie._id}).skip(page*servicePerPage).limit(servicePerPage).populate({
      path:'userId',
      select:'username email gender img country verified',
    }).populate({path:'categorieId',select:'name'});
    if(services){
      return res.status(201).json({services:services});
    }else{
      return res.status(404).json({error:'There is no services to show'});
    }
  }
  return res.status(404).json('Category not found!')
  }catch(error){
    console.log(error.message);
    return res.status(501).json({error:error.message});
  }
}


const getServices = async (req, res) => {

  try {
    const Services = await Service.find({userId:req.userId}).populate({
      path:'categorieId',
      select:'name'
    })
    res.status(200).send(Services);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({error:err.message})
  }
};


module.exports = {
  createService,
  deleteService,
  getService,
  filterServices,
  ServicesByCategorie,
  getServices
};
