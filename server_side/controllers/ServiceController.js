const Service = require("../models/Service");
const Order = require("../models/order");
const Categorie = require("../models/Categorie");
const Review = require("../models/Review");
const { isValidObjectId } = require("mongoose");
const { ObjectId } = require("bson");
const User = require("../models/User");

const createService = async (req, res) => {
  try {
  if (req.role !== "Service Provider" && req.role !== "Manager") {
    return res.status(403).json({error:"Only Service Provider can create a Service!"});
  }
  if (!req.file) {
    return res.status(403).json({error:"You should upload cover for your Service !!"});
  }
  const categorie = await Categorie.findOne({ name:req.body.categorie });
  if (!categorie) {
    return res.status(403).json({error:"There is no Categorie with this name !!!"});
  }
  if(req.userId !== "Service Provider"){
    const serviceProvider = await User.findOne({_id : req.body.userId})
    if(serviceProvider.managerId.toString() !== req.userId){
      return res.status(401).json({error:"You Can create a Service Only for your service Provider!"})
    }
  }
 
  
    const newService = new Service({
      ...req.body,
      userId: ((req.role =='Service Provider')? req.userId : req.body.userId),
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

//This is FOR A USER IF HE want TO SEARCH for A SERVICE

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


const getMyServices = async (req, res) => {
  if(req.role !== "Manager" && req.role !== "Manager"){
    return res.status(401).json({error: "Only Service Provider And Manager have Services !!"})
  }
  try {
    if(req.role === "Service Provider"){
      const services = await Service.find({userId:req.userId}).populate({
        path:'categorieId',
        select:'name'
      }).populate({
        path:"userId",
        select:"username email gender img country verified"
      })
      if(services.length === 0){
        return res.status(401).json({error:"No services yet"})
      }
      return res.status(201).json({services : services})
    }else{
      let services = [] ; 
      const serviceProvider = await User.find({managerId : req.userId })
      for (const s of serviceProvider) {
        const service = await Service.find({ userId: s._id }).populate({
          path: 'categorieId',
          select: 'name'
        }).populate({
          path: "userId",
          select: "username email gender img country verified"
        });
        console.log("service : ", service);
        services.push(...service);
      }
      if(services.length ===0){
        return res.status(401).json({error:"No services yet"})
      }
      return res.status(200).json(services);
      }
      
      
   
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
  getMyServices
};
