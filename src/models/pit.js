const mongoose = require("mongoose");

const PitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dt_inicial: {
    type: Date,
    required: true,
  },
  dt_final: {
    type: Date,
    required: true,
  },
  teaching: {
    type: Number,
    required: true,
  },
  researching: {
    type: Number,
    required: true,
  },
  extension: {
    type: Number,
    required: true,
  },
  management: {
    type: Number,
    required: true,
  },
  leave: {
    type: Number,
    required: true,
  },
  year: { type: mongoose.Schema.Types.ObjectId, ref: "Year" },
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  description: {
    type: String,
  },
});

const Pit = mongoose.model("Pit", PitSchema);

Pit.getAnualPitActivities = async (year, userId) => {
  year = 2021;
  let pitQuery = {
    dt_inicial: {
      $gte: new Date(year, 0, 1),
      $lt: new Date(year, 11, 31),
    },
  };

  if (userId) {
    pitQuery.user = userId;
  }

  const activities = await Pit.aggregate([
    // { $match: pitQuery },
    { $unwind: "$activities" },
    {
      $lookup: {
        from: "categories",
        localField: "activities",
        foreignField: "_id",
        as: "activityData",
      },
    },
    { $unwind: "$activityData" },
    {
      $group: {
        _id: "$activityData._id",
        activityData: { $first: "$activityData" },
      },
    },
    { $project: { _id: 0, activity: "$activityData" } },
    { $sort: { "activity.description": 1 } },
  ]);

  return activities.map((item) => item.activity);
};

module.exports = Pit;
