const express = require("express");
const Message = require("../controllers/message");
const router = express.Router();

//INDEX
router.get("/:yearId", Message.getUserMessages);
