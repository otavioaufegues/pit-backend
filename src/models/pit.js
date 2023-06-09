const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

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

Pit.getAnualPitActivities = async (yearId, userId) => {
  const pitQuery = { user: ObjectId(userId), year: ObjectId(yearId) };
  const activities = await Pit.aggregate([
    { $match: pitQuery },
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
      $lookup: {
        from: "axes",
        localField: "activityData.axis",
        foreignField: "_id",
        as: "axisData",
      },
    },
    { $unwind: "$axisData" },
    {
      $group: {
        _id: "$activityData._id",
        activityData: { $first: "$activityData" },
        axisData: { $first: "$axisData" },
      },
    },
    {
      $project: {
        _id: 0,
        activity: {
          _id: "$activityData._id",
          description: "$activityData.description",
          axis: "$axisData",
          limitHours: "$activityData.limitHours",
          details: "$activityData.details",
          __v: "$activityData.__v",
          createdAt: "$activityData.createdAt",
          updatedAt: "$activityData.updatedAt",
          status: "$activityData.status",
        },
      },
    },

    { $sort: { "activity.description": 1 } },
  ]);

  return activities.map((item) => item.activity);
};

module.exports = Pit;
