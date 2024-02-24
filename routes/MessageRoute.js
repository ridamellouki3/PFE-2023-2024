const express =require("express")
const {
  createMessage,
  getMessages,
} = require("../controllers/MessageController");
const verifyToken = require("../middleware/JWT")

const router = express.Router();

router.get("/:id", verifyToken, getMessages);
router.post("/", verifyToken, createMessage);


module.exports = router;