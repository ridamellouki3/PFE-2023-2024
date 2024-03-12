const express = require('express');
const verifyToken = require('../middleware/JWT')
const router = express.Router()
const {verifyProfile,userPofile,createUser,deleteUser,deleteByManager} = require('../controllers/UserController')
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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users/{id}/verify/{token}:
 *   get:
 *     tags: [Users]
 *     summary: Verify profile
 *     description: Verify user profile with a token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Verification token
 *     responses:
 *       '200':
 *         description: User profile verified
 *       '400':
 *         description: Invalid link
 */
router.get("/:id/verify/:token",verifyProfile)
/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags: [Users]
 *     summary: Get user profile
 *     description: Retrieve user profile information
 *     responses:
 *       '200':
 *         description: User profile retrieved successfully
 */
router.get('/profile',verifyToken,userPofile);
/**
 * @swagger
 * /api/users/createUser:
 *   post:
 *     tags: [Users]
 *     summary: Create user
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               img:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - img
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '403':
 *         description: Only managers can create a user
 *       '500':
 *         description: Internal server error
 */
router.post('/createUser',upload.single('img'),verifyToken,createUser);
/**
 * @swagger
 * /api/users/delete/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user
 *     description: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '403':
 *         description: You can delete only your account
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/delete/:id',verifyToken,deleteUser);
/**
 * @swagger
 * /api/users/deleteByManager/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user by manager
 *     description: Delete a user by ID from a manager
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '401':
 *         description: This is only for managers
 *       '500':
 *         description: Internal server error
 */
router.delete('/deleteByManager/:id',deleteByManager);


module.exports = router