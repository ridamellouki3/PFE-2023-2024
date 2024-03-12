const express = require("express");
const {
  createService,
  deleteService,
  getService,
  getServices,
} = require("../controllers/ServiceController");
const verifyToken = require("../middleware/JWT");
const router = express.Router();
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
 * components:
 *   tags:
 *     name: Services
 *     description: APIs related to Services
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who created the service.
 *         title:
 *           type: string
 *           description: The title of the service.
 *         desc:
 *           type: string
 *           description: The description of the service.
 *         totalStars:
 *           type: number
 *           description: The total stars given in all reviews for the service.
 *         starNumber:
 *           type: number
 *           description: The total number of reviews for the service.
 *         categorieId:
 *           type: string
 *           format: uuid
 *           description: The ID of the category associated with the service.
 *         price:
 *           type: number
 *           description: The price of the service.
 *         cover:
 *           type: string
 *           description: The cover image URL of the service.
 *         sales:
 *           type: number
 *           description: The total number of sales for the service.
 *       required:
 *         - userId
 *         - title
 *         - desc
 *         - categorieId
 *         - price
 *         - cover
 *
 * /api/services:
 *   post:
 *     tags: [Services]
 *     summary: Create a service
 *     description: Create a new service.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               categorie:
 *                 type: string
 *               price:
 *                 type: number
 *               cover:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Service created successfully.
 *       '403':
 *         description: Only Service Provider or Manager can create a Service.
 *       '500':
 *         description: Internal server error.
 *
 *   get:
 *     tags: [Services]
 *     summary: Get services
 *     description: Retrieve all services or filter services by user ID, category name, price range, or sort.
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter services by user ID.
 *       - in: query
 *         name: categorieName
 *         schema:
 *           type: string
 *         description: Filter services by category name.
 *       - in: query
 *         name: min
 *         schema:
 *           type: number
 *         description: Minimum price for filtering services.
 *       - in: query
 *         name: max
 *         schema:
 *           type: number
 *         description: Maximum price for filtering services.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort services by a field (e.g., "price").
 *     responses:
 *       '200':
 *         description: A list of services matching the filter criteria.
 *       '500':
 *         description: Internal server error.
 *
 * /api/services/{id}:
 *   get:
 *     tags: [Services]
 *     summary: Get service by ID
 *     description: Retrieve a service by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the service to retrieve.
 *     responses:
 *       '200':
 *         description: The requested service.
 *       '404':
 *         description: Service not found.
 *       '500':
 *         description: Internal server error.
 *
 *   delete:
 *     tags: [Services]
 *     summary: Delete a service
 *     description: Delete a service by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the service to delete.
 *     responses:
 *       '200':
 *         description: Service deleted successfully.
 *       '403':
 *         description: You can delete only your Service.
 *       '404':
 *         description: Service not found.
 *       '500':
 *         description: Internal server error.
 */



router.post("/",upload.single("cover"), verifyToken, createService);
router.delete("/:id", verifyToken, deleteService);
router.get("/single/:id", getService);
router.get("/", getServices);

module.exports = router;
