const express = require("express");
const { createMessage, getMessages } = require("../controllers/MessageController");
const verifyToken = require("../middleware/JWT");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: APIs related to messages
 * 
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         conversationId:
 *           type: string
 *           format: uuid
 *           description: The ID of the conversation to which the message belongs.
 *         userId:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who sent the message.
 *         message:
 *           type: string
 *           description: The content of the message.
 *       required:
 *         - conversationId
 *         - userId
 *         - message
 */

/**
 * @swagger
 * /api/messages:
 *   post:
 *     tags: [Messages]
 *     summary: Create a message
 *     description: Endpoint to create a new message in a conversation.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       '201':
 *         description: Message created successfully.
 *       '500':
 *         description: Internal server error.
 * 
 *   get:
 *     tags: [Messages]
 *     summary: Get messages
 *     description: Endpoint to retrieve all messages for a conversation.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: conversationId
 *         schema:
 *           type: string
 *         description: ID of the conversation to retrieve messages for.
 *     responses:
 *       '200':
 *         description: Successful operation. Returns all messages for the conversation.
 *       '500':
 *         description: Internal server error.
 */

router.post("/", verifyToken, createMessage);
router.get("/:id", verifyToken, getMessages);

module.exports = router;