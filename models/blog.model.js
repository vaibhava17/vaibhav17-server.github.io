const mongoose = require("mongoose");
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      default: "Vaibhav Agarwal",
    },
    tags: {
      type: Array,
      required: false,
    }, 
    published: {
      type: Boolean,
      required: true,
      default: false,
    },
    archived: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDraft: {
      type: Boolean,
      required: true,
      default: false,
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.plugin(mongooseAggregatePaginate);
const Blog = mongoose.model("Blog", blogSchema);

module.exports = { Blog };