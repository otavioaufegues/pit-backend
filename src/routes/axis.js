const express = require("express");
const Axis = require("../controllers/axis");
const router = express.Router();

router.get("/", Axis.index);
module.exports = router;
