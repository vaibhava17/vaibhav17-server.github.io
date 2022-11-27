const express = require("express");

const {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteMultipleBlogs,
  likeBlog,
  publishBlog,
  archiveBlog,
} = require("../services/blog.service.js");
const { authorization } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.route("/").post(authorization, createBlog);
router.route("/").get(getBlogs);
router.route("/").delete(authorization, deleteMultipleBlogs);
router.route("/:id").get(getSingleBlog);
router.route("/:id").put(authorization, updateBlog);
router.route("/like/:id").put(likeBlog);
router.route("/publish/:id").put(authorization, publishBlog);
router.route("/archive/:id").put(authorization, archiveBlog);

module.exports = router;