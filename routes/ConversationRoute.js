const  express= require("express");
const {
  createConversation,
  getSingleConversation,
  getConversations,
  

} = require("../controllers/ConversationController");
const  verifyToken  =require ("../middleware/JWT");

const router = express.Router();

router.get("/conver/:_id", verifyToken, getSingleConversation);
router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);


module.exports = router ;