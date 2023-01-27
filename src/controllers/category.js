const Category = require("../models/category");

exports.index = async function (req, res) {
  const categories = await Category.find();

  res.status(200).json({ categories });
};

exports.store = async (req, res) => {
  try {
    const category = await Category.create({ ...req.body });

    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.show = async function (req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category)
      return res.status(401).json({ message: "Category does not exist" });

    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async function (req, res) {
  try {
    const update = req.body;
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );

    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.destroy = async function (req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    res.status(200).json({ message: "Category has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrUpdate = async function (req, res) {
  try {
    const category = await Category.updateOne(
      { _id: req.body._id }, 
      { $set: { description: req.body.description } }, 
      { upsert: true }
    );

    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
