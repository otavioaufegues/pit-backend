const mongoose = require("mongoose");
const Activity = require("../models/activity");
const Category = require("../models/category");
const Year = require("../models/year");
const User = require("../models/user");
const Axis = require("../models/axis");
const Department = require("../models/department");

const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");
const parser = require("xml2json");
const readStream = fs.createReadStream(
  path.join(__dirname, "../../uploads") + "/curriculo.xml",
  "utf8"
);

var extractArticleFromLattes = require("./lattes/extractArticleFromLattes");

exports.index = async function (req, res) {
  const activities = await Activity.find({})
    .populate("user")
    .populate("year")
    .populate("category");
  res.status(200).json({ activities });
};

exports.store = async (req, res) => {
  try {
    const { userId } = req.params;
    const { _id } = req.user;

    if (_id.toString() !== userId.toString())
      return res.status(401).json({
        message: "Desculpe, acesso negado.",
      });

    const activity = await Activity.create({ ...req.body, user: _id });
    const details = req.body.newData;
    // activity.department = 1;

    activity.details = "";
    details.map(function (val) {
      if (val.key != "") activity.details.set(val.key, val.value);
    });
    activity.save();

    res.status(200).json({ activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.show = async function (req, res) {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id)
      .populate("user")
      .populate("year")
      .populate("category");

    if (!activity)
      return res.status(401).json({ message: "Activity does not exist" });

    res.status(200).json({ activity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async function (req, res) {
  try {
    const update = req.body;
    const { id, userId } = req.params;
    const { _id } = req.user;

    if (_id.toString() !== userId.toString())
      return res.status(401).json({
        message: "Desculpe, acesso negado.",
      });

    const activity = await Activity.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );

    res.status(200).json({ activity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.destroy = async function (req, res) {
  try {
    const { id, userId } = req.params;
    const { _id } = req.user;

    if (_id.toString() !== userId.toString())
      return res.status(401).json({
        message: "Desculpe, acesso negado.",
      });

    const activity = await Activity.findByIdAndDelete(id);

    res.status(200).json({ message: "Activity has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// por usuario logado
exports.getActivitiesByCategory = async function (req, res) {
  try {
    const { yearNumber } = req.params;
    const { _id: userId } = req.user;
    const year = await Year.findOne({ year: yearNumber });

    const activitiesByCategory = await Activity.getActivities(year._id, userId);

    res.status(200).json({ activitiesByCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// por usuario details evolution
exports.getDetailsEvolution = async function (req, res) {
  try {
    // const { yearNumber } = req.params;
    const userId = req.user._id;
    const data = new Map();
    const categories = await Category.find().populate("axis");
    // const year = await Year.findOne({ year: yearNumber });

    const activities = await Activity.find({ user: userId })
      .populate("user")
      .populate("year")
      .populate("category")
      .populate("department"); //remover

    categories.forEach((category) => {
      if (!data.has(category)) data.set(category, []);

      activities.forEach((activity) => {
        if (category._id.equals(activity.category._id)) {
          data.get(category).push({
            _id: activity._id,
            description: activity.description,
            details: activity.details, //detalhes atividade (seeder)
            // department: activity.department //remover
            year: activity.year,
          });
        }
      });
    });

    const activitiesByCategory = [];
    data.forEach((activity, category) => {
      activitiesByCategory.push({
        _id: category._id,
        description: category.description,
        activities: activity,
        axis: category.axis._id, //TODO: analisar se algum lugar utiliza, caso contrario remover
        axisObject: category.axis,
        axisIcon: category.axis.icon,
        details: category.details, //detalhes categoria
      });
    });

    activitiesByCategory.sort(function (a, b) {
      return a.axis < b.axis ? -1 : a.axis > b.axis ? 1 : 0;
    });

    res.status(200).json({ activitiesByCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// por usuario logado
exports.getActivitiesCountByCategory = async function (req, res) {
  try {
    const { yearNumber } = req.params;
    const year = await Year.findOne({ year: yearNumber });
    const userId = req.user._id;

    const totalActivitiesByCategory = await Activity.aggregate([
      { $match: { year: year._id, user: userId } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $group: {
          _id: { category: "$category" },
          totalActivitiesByCategory: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ totalActivitiesByCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// por usuario logado
exports.getActivitiesCountByAxis = async function (req, res) {
  try {
    const { yearNumber } = req.params;
    const userId = req.user._id;

    const year = await Year.findOne({ year: yearNumber });

    const totalActivitiesByAxis = await Activity.aggregate([
      { $match: { year: year._id, user: userId } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "axes",
          localField: "category.axis",
          foreignField: "_id",
          as: "axis",
        },
      },
      {
        $group: {
          _id: { axis: "$axis" },
          totalActivitiesByAxis: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ totalActivitiesByAxis });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// por departamento
exports.getActivitiesCountByCategoryByDepartment = async function (req, res) {
  try {
    const { yearNumber, departmentId } = req.params;

    const year = await Year.findOne({ year: yearNumber });

    const totalActivitiesByCategory = await Activity.aggregate([
      { $match: { year: year._id, department: parseInt(departmentId) } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $group: {
          _id: { category: "$category", department: "$department" },
          totalActivitiesByCategory: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ totalActivitiesByCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// por departamento
exports.getActivitiesCountByAxisByDepartment = async function (req, res) {
  try {
    const { yearNumber, departmentId } = req.params;

    const year = await Year.findOne({ year: yearNumber });

    const totalActivitiesByAxis = await Activity.aggregate([
      { $match: { year: year._id, department: parseInt(departmentId) } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "axes",
          localField: "category.axis",
          foreignField: "_id",
          as: "axis",
        },
      },
      {
        $group: {
          _id: { axis: "$axis", department: "$department" },
          totalActivitiesByAxis: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ totalActivitiesByAxis });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// por instituição
exports.getActivitiesCountByCategoryByInstitution = async function (req, res) {
  try {
    const { yearNumber } = req.params;

    const year = await Year.findOne({ year: yearNumber });

    const totalActivitiesByCategory = await Activity.aggregate([
      { $match: { year: year._id } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $group: {
          _id: { category: "$category" },
          totalActivitiesByCategory: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ totalActivitiesByCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// por instituição
exports.getActivitiesCountByAxisByInstitution = async function (req, res) {
  try {
    const { yearNumber } = req.params;

    const year = await Year.findOne({ year: yearNumber });

    const totalActivitiesByAxis = await Activity.aggregate([
      { $match: { year: year._id } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "axes",
          localField: "category.axis",
          foreignField: "_id",
          as: "axis",
        },
      },
      {
        $group: {
          _id: { axis: "$axis" },
          totalActivitiesByAxis: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ totalActivitiesByAxis });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// por usuario
exports.getActivitiesCountByCategoryByUser = async function (req, res) {
  try {
    const { yearNumber, username } = req.params;

    const year = await Year.findOne({ year: yearNumber });
    const user = await User.findOne({ username: username });

    const totalActivitiesByCategory = await Activity.aggregate([
      { $match: { year: year._id, user: user._id } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $group: {
          _id: { category: "$category" },
          totalActivitiesByCategory: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ totalActivitiesByCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// por usuario (pizza e radar)
exports.getActivitiesCountByAxisByUser = async function (req, res) {
  try {
    const { yearNumber, username } = req.params;

    const year = await Year.findOne({ year: yearNumber });
    const user = await User.findOne({ username: username });

    const totalActivitiesByAxis = await Activity.aggregate([
      { $match: { year: year._id, user: user._id } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "axes",
          localField: "category.axis",
          foreignField: "_id",
          as: "axis",
        },
      },
      {
        $group: {
          _id: { axis: "$axis" },
          totalActivitiesByAxis: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ totalActivitiesByAxis });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// por usuario em um departamento (radar)
exports.getActivitiesCountByAxisByUserByDepartment = async function (req, res) {
  try {
    const { yearNumber, departmentId } = req.params;

    const year = await Year.findOne({ year: yearNumber });

    const totalActivitiesByAxis = await Activity.aggregate([
      { $match: { year: year._id, department: parseInt(departmentId) } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "axes",
          localField: "category.axis",
          foreignField: "_id",
          as: "axis",
        },
      },
      {
        $group: {
          _id: { axis: "$axis", user: "$user" },
          totalActivitiesByAxis: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ totalActivitiesByAxis });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// por todos usuario (radar)
exports.getActivitiesCountByAxisAllUser = async function (req, res) {
  try {
    const { yearNumber } = req.params;

    const year = await Year.findOne({ year: yearNumber });

    const totalActivitiesByAxis = await Activity.aggregate([
      { $match: { year: year._id } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "axes",
          localField: "category.axis",
          foreignField: "_id",
          as: "axis",
        },
      },
      {
        $group: {
          _id: { axis: "$axis", user: "$user" },
          totalActivitiesByAxis: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ totalActivitiesByAxis });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// por todos departamentos (radar)
exports.getActivitiesCountByAxisAllDepartment = async function (req, res) {
  try {
    const { yearNumber } = req.params;

    const year = await Year.findOne({ year: yearNumber });

    const totalActivitiesByAxis = await Activity.aggregate([
      { $match: { year: year._id } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "axes",
          localField: "category.axis",
          foreignField: "_id",
          as: "axis",
        },
      },
      {
        $group: {
          _id: { axis: "$axis", department: "$department", year: "$year" },
          totalActivitiesByAxis: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ totalActivitiesByAxis });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// evolução
exports.getActivitiesCountByAxisEvolution = async function (req, res) {
  try {
    const userId = req.user._id;

    const totalActivitiesByAxis = await Activity.aggregate([
      { $match: { user: userId } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "axes",
          localField: "category.axis",
          foreignField: "_id",
          as: "axis",
        },
      },
      {
        $lookup: {
          from: "years",
          localField: "year",
          foreignField: "_id",
          as: "year",
        },
      },
      {
        $group: {
          _id: { axis: "$axis", year: "$year" },
          totalActivitiesByAxis: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ totalActivitiesByAxis });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDetailsActivity = async function (req, res) {
  const { activityId } = req.params;
  const details = req.body;

  const activity = await Activity.findById(activityId).exec();
  activity.details = details;
  await activity.save();

  res.status(200).json({ activity });
};

async function saveDetails(yearId, departmentId, userId, v) {
  let description = v.categoria;
  const category = await Category.findOne({ description: description });

  let query = {
      category: category._id,
      year: yearId,
      department: departmentId,
      user: userId,
      description:
        v.turma ||
        v.aluno ||
        v.projeto ||
        v.publicacao ||
        v.atividade ||
        v.tipo,
    },
    update = {
      details: {},
    },
    options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      useFindAndModify: false,
    };

  await Activity.findOneAndUpdate(
    query,
    update,
    options,
    function (error, result) {
      if (!error) {
        if (!result) result = new Activity();

        result.save(function (error) {
          if (!error) {
            Object.entries(v).map((v) => {
              if (v[0] != "") result.details.set(v[0], v[1]);
            });
            result.save();
          } else {
            throw error;
          }
        });
      }
    }
  );
}

exports.addDetailsActivity = async function (req, res) {
  try {
    const { yearNumber } = req.body;

    const year = await Year.findOne({ year: yearNumber });
    const usersRit = require(`../data/rit-${year.year}.json`);

    const userId = req.user._id;
    const siape = req.user.siape;
    const yearId = year._id;
    const departmentId = req.user.department;

    const data = usersRit.rits
      .filter((v) => {
        return v.SIAPE == siape;
      })
      .map((v) => {
        v.ensino.map((v) => saveDetails(yearId, departmentId, userId, v));

        v.administrativas.map((v) =>
          saveDetails(yearId, departmentId, userId, v)
        );

        v.pesquisaEExtensao.map((v) =>
          saveDetails(yearId, departmentId, userId, v)
        );

        v.afastamentoECapacitacao.map((v) =>
          saveDetails(yearId, departmentId, userId, v)
        );
      });

    if (data.length === 0) res.status(400).json({ status: "bad" });

    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFileImportLattes = (req, res) => {
  if (!req.files) {
    res.send({
      status: false,
      message: "No file uploaded",
    });
  }
  return req.files.document;
};

const extractFileFromRequest = (document) => {
  let zip = new AdmZip(document.data);
  zip.extractEntryTo(
    "curriculo.xml",
    "./uploads",
    /*maintainEntryPath*/ false,
    /*overwrite*/ true
  );
};

exports.addDetailsActivityLattes = async function (req, res) {
  try {
    const { yearNumberLattes } = req.body;

    extractFileFromRequest(getFileImportLattes(req, res));

    if (yearNumberLattes === "" || isNaN(yearNumberLattes))
      return res.status(400).json();

    const year = await Year.findOne({ year: yearNumberLattes });

    if (year === null) return res.status(400).json();

    const userId = req.user._id;
    const yearId = year._id;
    const departmentId = req.user.department;

    let data = "";
    readStream
      .on("data", function (chunk) {
        data += chunk;
      })
      .on("end", function () {
        data = JSON.parse(parser.toJson(data, { reversible: true }));
        data = extractArticleFromLattes(
          data,
          yearNumberLattes,
          yearId,
          departmentId,
          userId
        );
      });

    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.createDetailsActivity = async function (req, res) {
//   const { activityId } = req.params;
//   const details = req.body;

//   console.log("details", details);

//   const activity = await Activity.findById(activityId).exec();

//   activity.details = "";
//   details.map(function (val) {
//     if (val.key != "") activity.details.set(val.key, val.value);
//   });
//   activity.save();

//   res.status(200).json({ activity });
// };

// exports.storeDetailsActivity = async function (req, res) {
//   const { activityId, key } = req.body;

//   let newKey = key[0].toLowerCase() + key.substr(1); // coloca primeira letra em minusculo
//   newKey = newKey.replace(/\s+/g, ""); // remove espaços em branco
//   newKey = newKey.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // remove ascentos

//   console.log(req.body);

//   const activity = await Activity.findById(activityId).exec();
//   activity.details.set(newKey, "");
//   activity.save();

//   res.status(200).json({ activity });
// };

// método update tela de detailsActivity
// exports.updateDetailsActivity = async function (req, res) {
//   const { activityId, key, value } = req.body;

//   let newKey = key[0].toLowerCase() + key.substr(1); // coloca primeira letra em minusculo
//   newKey = newKey.replace(/\s+/g, ''); // remove espaços em branco
//   newKey = newKey.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // remove ascentos

//   const activity = await Activity.findById(activityId).exec();
//   activity.details.set(newKey, value);
//   activity.save();

//   res.status(200).json({ activity });
// };
