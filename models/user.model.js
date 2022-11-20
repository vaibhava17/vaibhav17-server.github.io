const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const moment = require("moment");
const otpGenerator = require('otp-generator');

const userSchema = mongoose.Schema(
  {
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    otp: String,
    otpExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = bcrypt.genSalt(process.env.SALT_ROUNDS);
  this.password = bcrypt.hash(this.password, salt);
});

userSchema.methods.createOTP = function () {
  let OTPString = otpGenerator.generate(process.env.OPT_LENGTH, { upperCaseAlphabets: false, specialChars: false });
  this.otp = crypto.createHash('sha256').update(OTPString).digest('hex');
  this.otpExpires = moment().add(2, "minutes").format();
  return OTPString;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
