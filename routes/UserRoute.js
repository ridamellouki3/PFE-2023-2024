const express = require('express');
const verifyToken = require('../middleware/JWT')
const router = express.Router()
const {userPofile,createUser,deleteUser} = require('../controllers/UserController')
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
router.get('/profile',verifyToken,userPofile);
router.post('/createUser',upload.single('img'),verifyToken,createUser);
router.delete('/delete/:id',verifyToken,deleteUser);





module.exports = router