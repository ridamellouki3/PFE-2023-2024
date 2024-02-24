const Service = require("../models/Service");
const Categorie = require('../models/Categorie') 

const createService = async (req, res) => {
  if (req.role !== "Service Provider " && req.role !== "Manager"){
    return res.status(403).json("Only sellers can create a Service!");
  }
  if(!req.file){
    return res.status(403).json("You should upload cover of your Service !!")
  }
  console.log(req.file);
  const categorie =await Categorie.findOne({name:req.body.categorie}); 
  console.log(categorie)
  if(!categorie){
    return res.status(403).json("There is no Categorie with this name !!!");
  } 
  try {
  const newService = new Service({
    ...req.body,
    //userId: (req.userId=='Service Provider')? req.userId : req.body.user,
    userId : req.userId ,
    categorieId : categorie._id,
    cover : req.file.filename
  });
  console.log(Service)

 
  const savedService = await newService.save();
    return res.status(201).json(savedService);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err.message);
  }
};
const deleteService = async (req, res) => {
  try {
    const Service = await Service.findById(req.params.id);
    if (Service.userId !== req.userId){
      return res.status(403).json("You can delete only your Service!")}

    await Service.findByIdAndDelete(req.params.id);
    return res.status(200).send("Service has been deleted!");
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message);
  }
};
const getService = async (req, res) => {
  try {
    const Service = await Service.findById(req.params.id);
    if (!Service) {res.status(404).json("Service not found!")};
    return res.status(200).send(Service);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
};

//This is FOR A USER IF HE NEED TO SEARCH ABOUT A SERVICE 
const getServices = async (req, res) => {
    try {
      const { userId, categorieId, min, max, sort } = req.query;

      const categorie = await Categorie.findOne({name:categorieId});

      const filters = {};
      if (userId) {filters.userId = userId;}
      if (categorieId) {filters.categorieId = categorieId;}
      if (min || max) {filters.price = {};}
      if (min){ filters.price.$gt = min;}
      if (max) {filters.price.$lt = max;}

      console.log(filters);
  
      const sortOptions = sort ? { [sort]: -1 } : {};
      const services = await Service.find(filters).sort(sortOptions);
  
    return res.status(200).send(services);
    } catch (error) {
     console.log(error);
     return res.status(500).json(err.message);
    }
  };

  
module.exports = {
createService,deleteService,getService,getServices,
}