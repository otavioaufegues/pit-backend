const mongoose = require("mongoose");
const Category = require("../models/category");

const ActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },

    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

    year: { type: mongoose.Schema.Types.ObjectId, ref: "Year" },

    description: {
      type: String,
      required: "Description is required",
    },

    details: {
      type: Map,
      of: String,
    },

    limitHours: { type: mongoose.Schema.Types.Number, ref: "limitHours" },
  },
  { timestamps: true }
);
const Activity = mongoose.model("Activity", ActivitySchema);

Activity.getActivities = async (year, userId) => {
  const pipeline = [
    {
      $lookup: {
        from: "activities",
        let: { categoryId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$category", "$$categoryId"] }],
              },
            },
          },
        ],
        as: "activities",
      },
    },
    {
      $match: {
        activities: { $ne: [] },
      },
    },
    {
      $lookup: {
        from: "axes",
        localField: "axis",
        foreignField: "_id",
        as: "axis",
      },
    },
    {
      $project: {
        _id: 1,
        description: 1,
        axis: { $arrayElemAt: ["$axis", 0] },
        activities: 1,
      },
    },
  ];

  if (year) {
    pipeline[0].$lookup.pipeline[0].$match["$expr"].$and.push({
      $eq: ["$year", mongoose.Types.ObjectId(year._id)],
    });
  }

  if (userId) {
    pipeline[0].$lookup.pipeline[0].$match["$expr"].$and.push({
      $eq: ["$user", mongoose.Types.ObjectId(userId)],
    });
  }

  const activitiesByCategory = await Category.aggregate(pipeline);

  return activitiesByCategory;
};

module.exports = Activity;
