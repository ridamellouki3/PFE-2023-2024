const Service = require("../models/Service");


const createService = async (req, res, next) => {
  if (!req.role !== "Service Provider"){
    return res.status(403).json("Only sellers can create a Service!");
  }
  const newService = await new Service({
    ...req.body,
    userId: req.userId,
  });

  try {
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const deleteService = async (req, res, next) => {
  try {
    const Service = await Service.findById(req.params.id);
    if (Service.userId !== req.userId){
      return res.status(403).json("You can delete only your Service!")}

    await Service.findByIdAndDelete(req.params.id);
    res.status(200).send("Service has been deleted!");
  } catch (err) {
    console.log(err)
    next(err);
  }
};
const getService = async (req, res, next) => {
  try {
    const Service = await Service.findById(req.params.id);
    if (!Service) {res.status(404).json("Service not found!")};
    res.status(200).send(Service);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const getServices = async (req, res, next) => {
    try {
      const { userId, cat, min, max, sort } = req.query;

      const filters = {};
      if (userId) {filters.userId = userId;}
      if (cat) {filters.cat = cat;}
      if (min || max) {filters.price = {};}
      if (min){ filters.price.$gt = min;}
      if (max) {filters.price.$lt = max;}
  
      const sortOptions = sort ? { [sort]: -1 } : {};
      const services = await Service.find(filters).sort(sortOptions);
  
    res.status(200).send(services);
    } catch (error) {
     console.log(error);
      next(error);
    }
  };
  
module.exports = {
createService,deleteService,getService,getServices,
}