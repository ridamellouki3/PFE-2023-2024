const express = require('express');
const verifyToken = require('../middleware/JWT')
const router = express.Router()

router.get('/profile',verifyToken,);






module.exports = route