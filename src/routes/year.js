const express = require("express");
const Year = require("../controllers/year");
const router = express.Router();

router.get("/", Year.index);
router.post("/", Year.store);
router.get("/:id", Year.show);
router.put("/:id", Year.update);
router.delete("/:id", Year.destroy);

module.exports = router;
