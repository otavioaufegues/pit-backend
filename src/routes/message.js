const express = require("express");
const Message = require("../controllers/message");
const router = express.Router();

//INDEX
router.get("/:userId/:yearId", Message.getUserMessages);
router.post("/", Message.createMessages);
router.put("/:messageId", Message.readMessages);

module.exports = router;
