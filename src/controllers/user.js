const mongoose = require("mongoose");
const User = require("../models/user");
const Department = require("../models/department");
const Year = require("../models/year");
const Activity = require("../models/activity");
const Category = require("../models/category");
const Pit = require("../models/pit");

const { uploader, sendEmail } = require("../utils/index");

// @route GET admin/user
// @desc Returns all users
// @access Public
exports.index = async function (req, res) {
  const users = await User.find({}).populate("department");
  res.status(200).json({ users });
};

// @route POST api/user
// @desc Add a new user
// @access Public
exports.store = async (req, res) => {
  try {
    const { email } = req.body;

    // Make sure this account doesn't already exist
    const user = await User.findOne({ email });

    if (user)
      return res.status(401).json({
        message:
          "The email address you have entered is already associated with another account. You can change this users role instead.",
      });

    const password = "_" + Math.random().toString(36).substr(2, 9); //generate a random password
    const newUser = new User({ ...req.body, password });

    const user_ = await newUser.save();

    //Generate and set password reset token
    user_.generatePasswordReset();

    // Save the updated user object
    await user_.save();

    //Get mail options
    let domain = "http://" + req.headers.host;
    let subject = "New Account Created";
    let to = user.email;
    let from = process.env.FROM_EMAIL;
    let link =
      "http://" +
      req.headers.host +
      "/api/auth/reset/" +
      user.resetPasswordToken;
    let html = `<p>Hi ${user.username}<p><br><p>A new account has been created for you on ${domain}. Please click on the following <a href="${link}">link</a> to set your password and login.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`;

    await sendEmail({ to, from, subject, html });

    res
      .status(200)
      .json({ message: "An email has been sent to " + user.email + "." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route GET api/user/{id}
// @desc Returns a specific user
// @access Public
exports.show = async function (req, res) {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return res.status(401).json({ message: "User does not exist" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT api/user/{id}
// @desc Update user details
// @access Public
exports.update = async function (req, res) {
  try {
    const update = req.body;
    const id = req.params.id;
    const userId = req.user._id;

    //Make sure the passed id is that of the logged in user
    if (userId.toString() !== id.toString())
      return res.status(401).json({
        message: "Sorry, you don't have the permission to upd this data.",
      });

    const user = await User.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, useFindAndModify: false }
    );

    //if there is no image, return success message
    if (!req.file)
      return res.status(200).json({ user, message: "User has been updated" });

    //Attempt to upload to cloudinary
    const result = await uploader(req);
    const user_ = await User.findByIdAndUpdate(
      id,
      { $set: update },
      { $set: { profileImage: result.url } },
      { new: true }
    );

    if (!req.file)
      return res
        .status(200)
        .json({ user: user_, message: "User has been updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route DESTROY api/user/{id}
// @desc Delete User
// @access Public
exports.destroy = async function (req, res) {
  try {
    const id = req.params.id;
    const user_id = req.user._id;

    //Make sure the passed id is that of the logged in user
    if (user_id.toString() !== id.toString())
      return res.status(401).json({
        message: "Sorry, you don't have the permission to delete this data.",
      });

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsersByDepartment = async function (req, res) {
  try {
    const { yearNumber } = req.params;
    const data = new Map();
    const year = await Year.findOne({ year: yearNumber });
    const departments = await Department.find();
    const activities = await Activity.find({ year: year._id })
      .populate("department")
      .populate("user");

    departments.forEach((department) => {
      if (!data.has(department)) data.set(department, []);

      activities.forEach((activity) => {
        if (department._id.equals(activity.user.department)) {
          data.get(department).push({
            _id: activity.user._id,
            firstName: activity.user.firstName,
            username: activity.user.username,
            departmentId: activity.user.department,
          });
        }
      });
    });

    const usersByDepartment = [];
    data.forEach((user, department) => {
      let userArr = user
        .map((e) => JSON.stringify(e))
        .reduce((acc, cur) => (acc.includes(cur) || acc.push(cur), acc), [])
        .map((e) => JSON.parse(e));
      usersByDepartment.push({
        _id: department._id,
        name: department.name,
        users: userArr,
      });
    });

    res.status(200).json({ usersByDepartment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getResult = async function (req, res) {
  try {
    const { userId, yearId } = req.params;

    const pitCategories = await Pit.getAnualPitActivities(yearId, userId);
    const activitiesByCategory = await Activity.getActivities(yearId, userId);
    const pitCategoryIds = pitCategories.map((category) => category._id);
    const activitiesCategoryIds = activitiesByCategory.map(
      (category) => category._id
    );

    const result = pitCategories.map((pitCategory) => {
      if (activitiesCategoryIds.some((item) => item.equals(pitCategory._id))) {
        pitCategory.status = "miss";
        return pitCategory;
      } else {
        pitCategory.status = "ok";
        return pitCategory;
      }
    });

    activitiesByCategory.forEach((category) => {
      if (!pitCategoryIds.some((item) => item.equals(category._id))) {
        category.status = "plus";
        result.push(category);
      }
    });

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
