const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const User = require("../controllers/user");
const validate = require("../middlewares/validate");

const router = express.Router();

const upload = multer().single("profileImage");

router.get("/getUsersByDepartment/:yearNumber", User.getUsersByDepartment);

router.get("/getResult/:userId/:yearId", User.getResult);

router.get("/getTeachers", User.getTeachers);

//INDEX
router.get("/", User.index);

//STORE
router.post(
  "/",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("username").not().isEmpty().withMessage("You username is required"),
    check("firstName")
      .not()
      .isEmpty()
      .withMessage("You first name is required"),
    check("lastName").not().isEmpty().withMessage("You last name is required"),
    check("regime").not().isEmpty().withMessage("Your work regime is required"),
  ],
  User.store
);

//SHOW
router.get("/:id", User.show);

//UPDATE
// router.put("/:id", upload, User.update);
router.put("/:id", User.update);

//DELETE
router.delete("/:id", User.destroy);

module.exports = router;
