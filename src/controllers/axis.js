const Axis = require("../models/axis");

exports.index = async function (req, res) {
  const axis = await Axis.find();

  res.status(200).json({ axis });
};
