const mongoose = require("mongoose");
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

const mailSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
    spam: {
      type: Boolean,
      required: true,
      default: false
    },
    starred: {
      type: Boolean,
      required: true,
      default: false
    },
    labels: [{
      type: String,
      required: true,
      default: "none",
      enum: ["none", "personal", "work", "important", "travel"]
    }],
  },
  {
    timestamps: true,
  }
);

mailSchema.plugin(mongooseAggregatePaginate);
const Mail = mongoose.model("Mail", mailSchema);

module.exports = { Mail };