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

router.route("/login").post(login);
router.route("/auth").get(authorization, authantication);
router.route("/otp/request").post(requestOTP);
router.route("/reset-password").put(authorization, resetPassword);
router.route("/profile").get(authorization, getUserProfile);
router.route("/profile").put(authorization, updateProfile);
router.route("/refresh-token").get(authorization, refreshToken);


module.exports = router;
