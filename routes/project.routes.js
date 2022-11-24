const express = require("express");

const {
  createProject,
  getProjects,
  getSingleProject,
  updateProject,
  deleteMultipleProjects,
} = require("../services/project.service.js");
const { authorization } = require("../middlewares/auth.middleware.js");
const { getRepoInfo } = require("../middlewares/repo.middleware.js");

const router = express.Router();

router.route("/").post(authorization, getRepoInfo, createProject);
router.route("/").get(getProjects);
router.route("/").delete(authorization, deleteMultipleProjects);
router.route("/:id").get(getSingleProject);
router.route("/:id").put(authorization, getRepoInfo, updateProject);

module.exports = router;


