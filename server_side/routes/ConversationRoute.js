const express = require("express");
const {
  createConversation,
  getSingleConversation,
  getConversations,
  deleteConverstion,
} = require("../controllers/ConversationController");
const verifyToken = require("../middleware/JWT");
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Conversation:
 *       type: object
 *       properties:
 *         serviceProviderId:
 *           type: string
 *           format: uuid
 *           description: The ID of the service provider involved in the conversation.
 *         clientId:
 *           type: string
 *           format: uuid
 *           description: The ID of the client involved in the conversation.
 *         readByServiceProvider:
 *           type: boolean
 *           description: Indicates whether the message has been read by the service provider.
 *         readByClient:
 *           type: boolean
 *           description: Indicates whether the message has been read by the client.
 *         lastMessage:
 *           type: string
 *           description: The last message sent in the conversation.
 *       required:
 *         - serviceProviderId
 *         - clientId
 *         - readByServiceProvider
 *         - readByClient
 */

/**
 * @swagger
 * /api/conversations:
 *   post:
 *     tags:
 *       - conversation
 *     summary: Create a conversation
 *     description: Endpoint to create a new conversation between users.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *             required:
 *               - to
 *     responses:
 *       '201':
 *         description: Conversation created successfully.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/conversations/conver/{id}:
 *   get:
 *     tags:
 *       - conversation
 *     summary: Get a single conversation
 *     description: Endpoint to retrieve a single conversation by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the conversation to retrieve.
 *     responses:
 *       '200':
 *         description: Successful operation. Returns the requested conversation.
 *       '404':
 *         description: Conversation not found.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/conversations:
 *   get:
 *     tags:
 *       - conversation
 *     summary: Get conversations
 *     description: Endpoint to retrieve all conversations for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation. Returns all conversations for the user.
 *       '500':
 *         description: Internal server error.
 */

router.post("/", verifyToken, createConversation);
router.get("/conver/:id", verifyToken, getSingleConversation);
router.get("/", verifyToken, getConversations);
router.delete("/:id",verifyToken,deleteConverstion)

module.exports = router;
