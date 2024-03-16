const express = require("express");
const verifyToken = require("../middleware/JWT");
const {
  getOrders,
  intent,
  confirm,
  completeOrder,
} = require("../controllers/OrderController");
const router = express.Router();


/**
 * @swagger
 *   tags:
 *      name: Orders
 *      description: APIs related to Orders
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         serviceId:
 *           type: string
 *           format: uuid
 *           description: The ID of the service associated with the order.
 *         img:
 *           type: string
 *           description: The image associated with the order.
 *         title:
 *           type: string
 *           description: The title of the order.
 *         price:
 *           type: number
 *           description: The price of the order.
 *         serviceProviderId:
 *           type: string
 *           format: uuid
 *           description: The ID of the service provider associated with the order.
 *         clientId:
 *           type: string
 *           format: uuid
 *           description: The ID of the client associated with the order.
 *         time:
 *           type: string
 *           format: date-time
 *           description: The time when the order was placed.
 *         isCompleteService:
 *           type: boolean
 *           description: Indicates whether the service is complete.
 *         isConfirmed:
 *           type: boolean
 *           description: Indicates whether the order is confirmed.
 *         payment_intent:
 *           type: string
 *           description: The payment intent associated with the order.
 *       required:
 *         - serviceId
 *         - title
 *         - price
 *         - serviceProviderId
 *         - clientId
 *         - time
 *         - payment_intent
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags: [Orders]
 *     summary: Get all orders
 *     description: Retrieve all orders.
 *     responses:
 *       '200':
 *         description: A list of orders.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/orders/create-payment/{id}:
 *   post:
 *     tags: [Orders]
 *     summary: Create payment intent for an order
 *     description: Create payment intent for an order.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the service associated with the order.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       '200':
 *         description: Payment intent created successfully.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   patch:
 *     tags: [Orders]
 *     summary: Confirm an order
 *     description: Confirm an order.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to confirm.
 *     responses:
 *       '200':
 *         description: Order confirmed successfully.
 *       '401':
 *         description: Unauthorized. Only the service provider can confirm orders.
 *       '404':
 *         description: Order not found.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/orders/compelete-order/{id}:
 *   patch:
 *     tags: [Orders]
 *     summary: Complete an order
 *     description: Complete an order.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to complete.
 *     responses:
 *       '201':
 *         description: Order completed successfully.
 *       '500':
 *         description: Internal server error.
 */

router.get("/", verifyToken, getOrders);



router.post("/create-payment/:id", verifyToken, intent);
router.patch("/:id", verifyToken, confirm);
router.patch("/compelete-order/:id", verifyToken, completeOrder);

module.exports = router;
