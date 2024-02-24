const express = require("express")
const verifyToken = require("../middleware/JWT")
const {
  createReview,
  getReviews,
  deleteReview,
}= require( "../controllers/ReviewController")

const router = express.Router();

router.post("/", verifyToken, createReview )
router.get("/:serviceId", getReviews )
router.delete("/:id",verifyToken,deleteReview)

module.exports = router;