const asyncHandler = require("express-async-handler");
const moment = require("moment");
const { User } = require("../models/user.model.js");
const { generateToken } = require("../utils/token.js");
const { sendSMS } = require("../utils/sms.js");

// @desc    login and get token
// @route   POST /api-v1/user/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email or password.",
    });
  }
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const otp = await user.createOTP();
    const message = await sendSMS(user.mobile, `Your OTP is ${otp}`);
    console.log(`Message From Twilio: ${message}`);
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: "OTP sent to your mobile number.",
      token: generateToken(user),
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid credentials! Please try again.",
    });
  }
});


// @desc    Two Factor Authantication
// @route   POST /api-v1/user/auth
// @access  Private
const authantication = asyncHandler(async (req, res) => {
  const hashedToken = crypto.createHash("sha256").update(req.body.otp).digest("hex");
  const user = await User.findOne({
    _id: req.user._id,
    otp: hashedToken,
    otpExpires: { $gt: moment().format() },
  });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "OTP is invalid or expired. Please try again.",
    });
  }
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "OTP verified successfully.",
    token: generateToken(user),
    data: {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      isAdmin: user.isAdmin,
    },
  });
});

// @desc    Request for OTP
// @route   GET /api-v1/user/otp
// @access  Public
const requestOTP = asyncHandler(async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) {
    return res.status(400).json({
      success: false,
      message: "Please provide mobile number.",
    });
  }
  const user = await User.findOne({
    mobile,
  });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Mobile number not registered.",
    });
  }
  const otp = await user.createOTP();
  const message = await sendSMS(user.mobile, `Your OTP is ${otp}`);
  console.log(`Message From Twilio: ${message}`);
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "OTP sent to your mobile number. Please verify.",
    token: generateToken(user),
  });
});


// @desc    Reset Password
// @route   PUT /api-v1/user/reset
// @access  Private
const resetPassword = asyncHandler(async (req, res) => {
  const password = req.body.password
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Please provide password."
    })
  }
  const hashedToken = crypto.createHash("sha256").update(req.body.otp).digest("hex");
  const user = await User.findOne({
    _id: req.user._id,
    otp: hashedToken,
    otpExpires: { $gt: moment().format() },
  });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "OTP is invalid or expired. Please try again.",
    });
  }
  user.password = password;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Password reset successfully. Please login.",
  });
});

// @desc   Get user profile
// @route  GET /api-v1/user
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found. Please try again.",
    });
  }
  res.status(200).json({
    success: true,
    message: "User profile fetched successfully.",
    token: generateToken(user),
    data: {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      isAdmin: user.isAdmin,
    },
  });
});

// @desc    update user profile
// @route   PUT /api/user
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const data = req.body;
  const user = await User.findByIdAndUpdate(userId, data, { new: true, });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found. Please try again.",
    });
  }
  const updatedUser = await user.save();
  res.status(200).json({
    success: true,
    message: "User profile updated successfully.",
    token: generateToken(updatedUser),
    data: {
      name: updatedUser.name,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      isAdmin: updatedUser.isAdmin,
    },
  });
});

// @desc refresh token
// @route GET /api-v1/user/token
// @access Private
const refreshToken = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found. Please try again.",
    });
  }
  res.status(200).json({
    success: true,
    message: "New token generated successfully.",
    token: generateToken(user),
  });
});

module.exports = {
  login,
  authantication,
  requestOTP,
  resetPassword,
  getUserProfile,
  updateProfile,
  refreshToken,
};
