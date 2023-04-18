const auth = require("./auth");
const user = require("./user");
const pit = require("./pit");
const activity = require("./activity");
const category = require("./category");
const year = require("./year");
const department = require("./department");
const axis = require("./axis");

const authenticate = require("../middlewares/authenticate");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send({
      message:
        "Welcome to the AUTHENTICATION API. Register or Login to test Authentication.",
    });
  });

  app.use("/api/auth", auth);
  app.use("/api/user", authenticate, user);
  app.use("/api/pit", authenticate, pit);
  app.use("/api/activity", authenticate, activity);
  app.use("/api/category", authenticate, category);
  app.use("/api/year", authenticate, year);
  app.use("/api/department", authenticate, department);
  app.use("/api/axis", axis);
};
