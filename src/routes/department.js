const express = require("express");
const Department = require("../controllers/department");
const router = express.Router();

router.get("/getDepartmentUser/:userId", Department.getDepartmentUser);

router.get("/", Department.index);
router.post("/", Department.store);
router.get("/:id", Department.show);
router.put("/:id", Department.update);
router.delete("/:id", Department.destroy);

module.exports = router;
