const Axis = require("../models/axis");
const Pit = require("../models/pit");
const Year = require("../models/year");
const User = require("../models/user");

// @route GET admin/pit
// @desc Returns all pit
// @access Restrict
exports.index = async function (req, res) {
  const userId = req.user._id;

  const pits = await Pit.find({ user: userId }).populate("user");
  res.status(200).json({ pits });
};

// @route GET admin/pit
// @desc Returns all pit
// @access Restrict
exports.getPitsByYear = async function (req, res) {
  const userId = req.user._id;
  const year = req.params.year;
  const pits = await Pit.find({
    user: userId,
    dt_inicial: {
      $gte: new Date(year + "-01-01T00:00:00.000Z"),
      $lt: new Date(year + "-12-31T23:59:59.000Z"),
    },
  }).populate("user");

  res.status(200).json({ pits });
};

exports.getDepartamentPit = async function (req, res) {
  try {
    const year = req.params.year;
    const resultPit = await getDepartmentPit(year);
    res.status(200).json({ resultPit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST api/pit
// @desc Add a new pit
// @access Restrict
exports.store = async (req, res) => {
  try {
    const userId = req.user._id;
    const pit = await Pit.create({ ...req.body, user: userId });
    res.status(200).json({ pit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route PUT api/pit/{id}
// @desc Update pit details
// @access Public
exports.update = async function (req, res) {
  try {
    const update = req.body;
    const id = req.params.id;

    const pit = await Pit.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );
    // await pit.save();

    res.status(200).json({ pit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route DESTROY api/pit/{id}
// @desc Delete Pit
// @access Public
exports.destroy = async function (req, res) {
  try {
    const pit = await Pit.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "PIT has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET api/pit/{id}
// @desc Returns a specific pit
// @access Restrict
exports.show = async function (req, res) {
  try {
    const id = req.params.id;
    const pit = await Pit.findById(id).populate("user");

    if (!pit) return res.status(401).json({ message: "Pit does not exist" });

    res.status(200).json({ pit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET api/pit/anual/{id}
// @desc Returns a specific pit
// @access Restrict
exports.showYearPit = async function (req, res) {
  try {
    const year = req.params.year;
    const userId = req.user._id;
    const resultPit = await getAnualPit(year, userId);

    res.status(200).json({ resultPit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET api/pit/compare/{year1}/{year2}
// @desc Returns a specific pit
// @access Restrict
exports.comparePit = async function (req, res) {
  try {
    const { year1, year2 } = req.params;
    const userId = req.user._id;

    const [resultPitYear1, resultPitYear2] = await Promise.all([
      getAnualPit(year1, userId),
      getAnualPit(year2, userId),
    ]);

    const resultPit = [];
    resultPit.push(resultPitYear1);
    resultPit.push(resultPitYear2);

    res.status(200).json({ resultPit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET api/pit/compare/department/{year2}
// @desc Returns a specific pit
// @access Restrict
exports.compareDepartmentPit = async function (req, res) {
  try {
    const { year } = req.params;
    const userId = req.user._id;

    const [resultPitYear1, resultPitYear2] = await Promise.all([
      getAnualPit(year, userId),
      getAnualPit(year),
    ]);

    const resultPit = [];
    resultPit.push(resultPitYear1);
    resultPit.push(resultPitYear2);

    res.status(200).json({ resultPit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAnualPit = async (year, userId) => {
  const axisLimit = await Axis.find().select(["ref", "limit"]);
  let yearHours = {};
  let resultPit = {};
  axisLimit.map((axis) => {
    yearHours[axis.ref] = 0;
    resultPit[axis.ref] = 0;
  });

  let pitQuery = {
    dt_inicial: {
      $gte: new Date(year, 0, 1),
      $lt: new Date(year, 11, 31),
    },
  };

  if (userId) {
    pitQuery.user = userId;
  }

  const pit = await Pit.find(pitQuery);

  axisLimit.map((axis) => {
    let multiplier = 0;
    pit.map((elem) => {
      yearHours[axis.ref] +=
        elem[axis.ref] *
        (elem.dt_final.getMonth() - elem.dt_inicial.getMonth());
      multiplier += elem.dt_final.getMonth() - elem.dt_inicial.getMonth();
    });
    const hoursNumber =
      axis.limit *
      (((yearHours[axis.ref] * 100) / (axis.limit * multiplier)).toFixed(2) /
        100);
    resultPit[axis.ref] = hoursNumber ? hoursNumber : 0;
  });

  return resultPit;
};

const getDepartmentPit = async (year) => {
  //buscar numero de professores ativos;
  const teachers = await User.find({ isVerified: true });

  const axisLimit = await Axis.find().select(["ref", "limit"]);
  let yearHours = {};
  let resultPit = {};

  //valores iniciais por eixo
  axisLimit.map((axis) => {
    yearHours[axis.ref] = 0;
    resultPit[axis.ref] = 0;
  });

  //busca todos os pits do ano de todos professores ativos
  const pit = await Pit.find({
    dt_inicial: {
      $gte: new Date(year, 0, 1),
      $lt: new Date(year, 11, 31),
    },
  });

  axisLimit.map((axis) => {
    let multiplier = 0;
    pit.map((elem) => {
      yearHours[axis.ref] +=
        elem[axis.ref] *
        (elem.dt_final.getMonth() - elem.dt_inicial.getMonth());
      multiplier += elem.dt_final.getMonth() - elem.dt_inicial.getMonth();
    });
    const avgHours = (yearHours[axis.ref] * 100) / teachers.length;
    const hoursNumber =
      axis.limit * ((avgHours / (axis.limit * multiplier)).toFixed(2) / 100);
    resultPit[axis.ref] = hoursNumber ? hoursNumber : 0;
  });

  return resultPit;
};
