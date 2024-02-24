const express = require("express");

const {
  createCat,
  getCategories,
} = require("../controllers/CategorieController");
const router = express.Router()

router.get('/',getCategories)
router.post('/create',createCat);



module.exports = router