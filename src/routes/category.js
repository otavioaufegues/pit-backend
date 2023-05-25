const express = require("express");
const Category = require("../controllers/category");
const router = express.Router();

router.get("/", Category.index);
router.get("/pitDropdownList", Category.pitDropdownList);
router.post("/", Category.store);
router.get("/:id", Category.show);
router.put("/:id", Category.update);
router.delete("/:id", Category.destroy);
router.post("/createOrUpdate/", Category.createOrUpdate);
module.exports = router;
