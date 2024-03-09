const Service = require("../models/Service");
const Order = require("../models/order");
const Categorie = require("../models/Categorie");
const Review = require("../models/Review");
const { isValidObjectId } = require("mongoose");
const { ObjectId } = require("bson");

const createService = async (req, res) => {
  if (req.role !== "Service Provider" && req.role !== "Manager") {
    return res.status(403).json("Only Service Provider can create a Service!");
  }
  if (!req.file) {
    return res.status(403).json("You should upload cover for your Service !!");
  }
  console.log(req.file);
  const categorie = await Categorie.findOne({ name: req.body.categorie });
  console.log(categorie);
  if (!categorie) {
    return res.status(403).json("There is no Categorie with this name !!!");
  }
  try {
    const newService = new Service({
      ...req.body,
      //userId: (req.userId=='Service Provider')? req.userId : req.body.user,
      userId: req.userId,
      categorieId: categorie._id,
      cover: req.file.filename,
    });
    await newService.save();
    return res.status(201).json(newService);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json("service Not found!!");
    }
    if (service.userId.toString() !== req.userId) {
      return res.status(403).json("You can delete only your Service!");
    }
    await Review.deleteMany({ serviceId: service._id });
    await Order.deleteMany({ serviceId: service._id });
    await service.deleteOne();
    return res.status(200).send("Service has been deleted!");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};
const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      res.status(404).json("Service not found!");
    }
    return res.status(200).send(service);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

//This is FOR A USER IF HE NEED TO SEARCH ABOUT A SERVICE

const getServices = async (req, res) => {
  try {
    const { userId, categorieName, min, max, sort } = req.query;
    if (!isValidObjectId(userId)) {
      return res.status(501).json("This Is Not A Valid Object Id");
    }
    let filters = {};

    if (categorieName) {
      const categorie = await Categorie.findOne({ name: categorieName });
      if (!categorie) {
        return res.status(403).json("There is no Categorie with that name !!!");
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

    console.log(filters);
    const sortOptions = sort ? { [sort]: -1 } : {};
    const services = await Service.find(filters).sort(sortOptions);
    console.log(await Service.find(filters));
    return res.status(200).send(services);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

module.exports = {
  createService,
  deleteService,
  getService,
  getServices,
};
