const express = require("express");
const Activity = require("../controllers/activity");
const router = express.Router();

router.get(
  "/getActivitiesByCategory/:yearNumber",
  Activity.getActivitiesByCategory
);
router.get(
  "/getDetailsEvolution", //details evolution
  Activity.getDetailsEvolution
);
router.get(
  "/getActivitiesCountByCategory/:yearNumber",
  Activity.getActivitiesCountByCategory
);
router.get(
  "/getActivitiesCountByAxis/:yearNumber",
  Activity.getActivitiesCountByAxis
);
router.get(
  "/getActivitiesCountByCategoryByDepartment/:yearNumber/:departmentId",
  Activity.getActivitiesCountByCategoryByDepartment
);
router.get(
  "/getActivitiesCountByAxisByDepartment/:yearNumber/:departmentId",
  Activity.getActivitiesCountByAxisByDepartment
);
router.get(
  "/getActivitiesCountByCategoryByInstitution/:yearNumber",
  Activity.getActivitiesCountByCategoryByInstitution
);
router.get(
  "/getActivitiesCountByAxisByInstitution/:yearNumber",
  Activity.getActivitiesCountByAxisByInstitution
);
router.get(
  "/getActivitiesCountByCategoryByUser/:yearNumber/:username",
  Activity.getActivitiesCountByCategoryByUser
);
router.get(
  "/getActivitiesCountByAxisByUser/:yearNumber/:username",
  Activity.getActivitiesCountByAxisByUser
);
router.get(
  "/getActivitiesCountByAxisByUserByDepartment/:yearNumber/:departmentId",
  Activity.getActivitiesCountByAxisByUserByDepartment
);
router.get(
  "/getActivitiesCountByAxisAllUser/:yearNumber",
  Activity.getActivitiesCountByAxisAllUser
);
router.get(
  "/getActivitiesCountByAxisAllDepartment/:yearNumber",
  Activity.getActivitiesCountByAxisAllDepartment
);
router.get(
  "/getActivitiesCountByAxisEvolution",
  Activity.getActivitiesCountByAxisEvolution
);
router.put(
  "/updateDetailsActivity/:activityId",
  Activity.updateDetailsActivity
);

router.post("/addDetailsActivity", Activity.addDetailsActivity); // importação dados json
router.post("/addDetailsActivityLattes", Activity.addDetailsActivityLattes); // importação dados lattes

router.get("/", Activity.index);
router.post("/:userId", Activity.store);
router.get("/:id", Activity.show);
router.put("/:id/:userId", Activity.update);
router.delete("/:id/:userId", Activity.destroy);

module.exports = router;
