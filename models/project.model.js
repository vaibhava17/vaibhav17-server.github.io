const mongoose = require("mongoose");
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: false,
      minItems: 2,
    },
    webURL: {
      type: String,
      required: true,
    },
    githubURL: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: false,
    },
    publishedAt: {
      type: Date,
      required: true,
    },
    owner:{
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

projectSchema.plugin(mongooseAggregatePaginate);
const Project = mongoose.model("Project", projectSchema);

module.exports = { Project };