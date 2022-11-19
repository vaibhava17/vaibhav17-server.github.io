const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/user.model.js");

const authorization = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  };
  if (!token) {
    return res.status(401).json({
      message: "You're not logged in!",
      success: false
    });
  };
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (err) {
    return res.status(403).json({
      message: "You're not authorized",
      success: false
    });
  };
});

module.exports = { authorization };
