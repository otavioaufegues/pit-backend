const Year = require("../models/year");

exports.index = async function (req, res) {
  const currentYear = new Date().getFullYear();

  const years = await Year.find().sort({ year: "desc" });

  // Verifica se o ano atual não está presente nos resultados
  const isCurrentYearPresent =
    years.findIndex((year) => year.year === currentYear) !== -1;

  if (!isCurrentYearPresent) {
    const newYear = new Year({ year: currentYear });
    await newYear.save();
    years.unshift(newYear);
  }

  res.status(200).json({ years });
};

exports.store = async (req, res) => {
  try {
    const year = await Year.create({ ...req.body });

    res.status(200).json({ year });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.show = async function (req, res) {
  try {
    const id = req.params.id;
    const year = await Year.findById(id);

    if (!year) return res.status(401).json({ message: "Year does not exist" });

    res.status(200).json({ year });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async function (req, res) {
  try {
    const update = req.body;
    const id = req.params.id;

    const year = await Year.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );

    res.status(200).json({ year });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.destroy = async function (req, res) {
  try {
    const year = await Year.findByIdAndDelete(req.params.id);
    //const category = await Category.remove();
    res.status(200).json({ message: "Year has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
