const express = require("express")
const verifyToken = require("../middleware/JWT")
const {
  createReview,
  getReviews,
  deleteReview,
}= require( "../controllers/ReviewController")
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         serviceId:
 *           type: string
 *           format: uuid
 *           description: The ID of the service associated with the review.
 *         userId:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who created the review.
 *         star:
 *           type: number
 *           description: The star rating given in the review.
 *         desc:
 *           type: string
 *           description: The description or comment in the review.
 *       required:
 *         - serviceId
 *         - userId
 *         - star
 *         - desc
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     tags: [Reviews]
 *     summary: Create a review
 *     description: Create a new review for a service.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       '201':
 *         description: Review created successfully.
 *       '403':
 *         description: Service Providers can't create a review.
 *       '500':
 *         description: Internal server error.
 *
 *   get:
 *     tags: [Reviews]
 *     summary: Get reviews for a service
 *     description: Retrieve all reviews for a specific service.
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the service to retrieve reviews for.
 *     responses:
 *       '200':
 *         description: A list of reviews for the specified service.
 *       '500':
 *         description: Internal server error.
 *
 * /api/reviews/{id}:
 *   delete:
 *     tags: [Reviews]
 *     summary: Delete a review
 *     description: Delete a review created by the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the review to delete.
 *     responses:
 *       '200':
 *         description: Review deleted successfully.
 *       '403':
 *         description: You can delete only your Review.
 *       '404':
 *         description: Review not found.
 *       '500':
 *         description: Internal server error.
 */

router.post("/", verifyToken, createReview )
router.get("/:serviceId", getReviews )
router.delete("/:id",verifyToken,deleteReview)

module.exports = router;