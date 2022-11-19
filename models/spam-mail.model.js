const mongoose = require("mongoose");
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2')

const spamMailSchema = mongoose.Schema(
  {
    email : {
      type: String,
      required: true,
      unique: true
    },
    receiveMail: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  {
    timestamps: true,
  }
);


spamMailSchema.plugin(mongooseAggregatePaginate);
const SpamMail = mongoose.model("SpamMail", spamMailSchema);

module.exports = { SpamMail };
