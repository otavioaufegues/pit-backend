const express = require("express");

const Pit = require("../controllers/pit");

const validate = require("../middlewares/validate");

const router = express.Router();

//INDEX
router.get("/", Pit.index);

router.get("/year/:year", Pit.getPitsByYear);

router.get("/department/:year", Pit.getDepartamentPit);

//STORE
router.post(
  "/register",
  //   [
  //     check("email").isEmail().withMessage("Enter a valid email address"),
  //     check("username").not().isEmpty().withMessage("You username is required"),
  //     check("firstName")
  //       .not()
  //       .isEmpty()
  //       .withMessage("You first name is required"),
  //     check("lastName").not().isEmpty().withMessage("You last name is required"),
  //     check("regime").not().isEmpty().withMessage("Your work regime is required"),
  //   ],
  //   validate,
  Pit.store
);

//SHOW
router.get("/:id", Pit.show);

// //UPDATE
router.put("/:id", Pit.update);

// //DELETE
router.delete("/:id", Pit.destroy);

router.get("/anual/:year", Pit.showYearPit);

router.get("/compare/department/:userId/:year", Pit.compareDepartmentPit);

router.get("/compare/:userId/:year1/:year2", Pit.comparePit);

module.exports = router;
