const express = require("express");

const {
  createCategorie,
  getCategories,
} = require("../controllers/CategorieController");
const router = express.Router()

router.get('/',getCategories)
router.post('/',createCategorie);



module.exports = router