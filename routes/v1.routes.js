const express = require("express");

const blogRoutes = require("./blog.routes.js");
const mailRoutes = require("./mail.routes.js");
const projectRoutes = require("./project.routes.js");
const userRoutes = require("./user.routes.js");

const router = express.Router();

router.use("/blog", blogRoutes);
router.use("/mail", mailRoutes);
router.use("/project", projectRoutes);
router.use("/user", userRoutes);

module.exports = router;