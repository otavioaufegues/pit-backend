const Department = require("../models/department");
const User = require("../models/user");

exports.index = async function (req, res) {
  const departments = await Department.find();
  res.status(200).json({ departments });
};

exports.store = async (req, res) => {
  try {
    const department = await Department.create({ ...req.body });

    res.status(200).json({ department });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.show = async function (req, res) {
  try {
    const id = req.params.id;
    const department = await Department.findById(id);

    if (!department)
      return res.status(401).json({ message: "Department does not exist" });

    res.status(200).json({ department });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async function (req, res) {
  try {
    const update = req.body;
    const id = req.params.id;

    const department = await Department.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );

    res.status(200).json({ department });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.destroy = async function (req, res) {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    //const category = await Category.remove();
    res.status(200).json({ message: "Department has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDepartmentUser = async function (req, res) {
  try {
    const userId = req.params.userId;    
    const user = await User.findById(userId);
    const department = await Department.findById(user.department);

    res.status(200).json({ department });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
