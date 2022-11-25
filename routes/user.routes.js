const express = require("express");

const {
  login,
  authantication,
  requestOTP,
  resetPassword,
  getUserProfile,
  updateProfile,
  refreshToken,
} = require("../services/user.service.js");
const { authorization } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.route("/").get(authorization, getUserProfile);
router.route("/").put(authorization, updateProfile);
router.route("/login").post(login);
router.route("/auth").post(authorization, authantication);
router.route("/otp").get(requestOTP);
router.route("/reset").put(authorization, resetPassword);
router.route("/token").get(authorization, refreshToken);


module.exports = router;
