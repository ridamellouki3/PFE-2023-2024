const express = require("express");
const verifyToken = require("../middleware/JWT");
const {
  getOrders,
  intent,
  confirm,
  completeOrder,
} = require("../controllers/OrderController");
const router = express.Router();

router.get("/", verifyToken, getOrders);
router.post("/create-payment/:id", verifyToken, intent);
router.patch("/:id", verifyToken, confirm);
router.patch("/compelete-order/:id", verifyToken, completeOrder);

module.exports = router;
