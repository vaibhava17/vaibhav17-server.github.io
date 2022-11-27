const bcrypt = require("bcryptjs");
const moment = require("moment");
const { adminUser } = require("./admin.user.data");
const user = [
  adminUser, // TODO: Remove this line.
  {
    name: "Test User",
    email: "testuser@test.io",
    mobile: "9219630519", // TODO: Change this to your mobile number.
    otp: "123456",
    otpExpires: moment().add(30, "minutes").format(),
    password: bcrypt.hashSync("123456", process.env.SALT_ROUNDS),
    isAdmin: true,
  }
];

module.exports = { user };