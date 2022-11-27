const asyncHandler = require("express-async-handler");
const { Blog } = require("../models/blog.model.js");

// @desc  add Blog
// @route POST /api-v1/blog?type="draft"
// @access Private
const createBlog = asyncHandler(async (req, res) => {
  const { type } = req.params
  const { title, description, image, content } = req.body;
  if (!title || !description || !image || !content) {
    res.status(400).json({ message: "Please fill all the fields.", success: false });
  }
  let values = {
    title,
    description,
    image,
    content,
  };
  if (type === "draft") {
    values.isDraft = true;
  } else {
    values.published = true;
  }
  const blog = await Blog.create(values);
  if (blog) {
    res.status(201).json({
      id: blog._id,
      success: true,
      message: blog.isDraft ? "Draft saved" : "Blog created successfully",
    });
  } else {
    res.status(401).json({ message: "Something went wrong.", success: false });
  }
});

// @desc  Get all Blogs
// @route GET /api-v1/blog
// @access Public
const getBlogs = asyncHandler(async (req, res) => {
  const { current, pageSize, sortField, sortOrder, search, type = "published" } = req.query;
  let query = [
    {
      $match: {
        archived: type === "archived",
        isDraft: type === "draft",
        published: type === "published",
      },
    },
    {
      $match: {
        $or: [
          { title: { $regex: search ? search : "", $options: "i" } },
          { description: { $regex: search ? search : "", $options: "i" } },
          { content: { $regex: search ? search : "", $options: "i" } },
          { tags: { $regex: search ? search : "", $options: "i" } },
        ],
      },
    },
  ];
  const option = {
    page: parseInt(current, 10) || 1,
    limit: parseInt(pageSize, 10) || 4,
    sort: { [sortField]: sortOrder },
  };
  return Mail.aggregatePaginate(Mail.aggregate(query), option).then((data) => {
    res.status(200).json({
      success: true,
      message: "blogs list",
      total: data.totalDocs,
      pageSize: data.limit,
      current: data.page,
      items: data.docs.map((item) => {
        return {
          id: item._id,
          title: item.title,
          description: item.description,
          image: item.image,
          createdAt: item.createdAt,
        };
      }),
    });
  });
});

// @desc  Get Single Blog
// @route GET /api-v1/blog/:id
// @access Public
const getSingleBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.status(200).json({
      success: true,
      message: "Blog data fetched successfully.",
      date: {
        id: blog._id,
        title: blog.title,
        description: blog.description,
        image: blog.image,
        content: blog.content,
        createdAt: blog.createdAt,
      },
    });
  } else {
    res.status(404).json({ message: "Blog not found.", success: false });
  }
});

// @desc  Update Blog
// @route PUT /api-v1/blog/:id
// @access Private
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    blog.title = req.body.title || blog.title;
    blog.description = req.body.description || blog.description;
    blog.image = req.body.image || blog.image;
    blog.content = req.body.content || blog.content;
    const updatedBlog = await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
      data: {
        id: updatedBlog._id,
        title: updatedBlog.title,
        description: updatedBlog.description,
        image: updatedBlog.image,
        content: updatedBlog.content,
        createdAt: updatedBlog.createdAt,
      },
    });
  } else {
    res.status(404).json({ message: "Blog not found", success: false });
  }
});

// @desc  Delete Multiple Blogs
// @route DELETE /api-v1/blog
// @access Private
const deleteMultipleBlogs = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (ids && ids.length > 0) {
    await Blog.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "Blogs removed successfully", success: true });
  } else {
    res.status(400).json({ message: "Provide atleast one blog id.", success: false });
  }
});

// @desc like Blog
// @route PUT /api-v1/blog/like/:id
// @access Public
const likeBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    blog.likes += 1;
    const updatedBlog = await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog liked successfully.",
      data: {
        id: updatedBlog._id,
        title: updatedBlog.title,
        description: updatedBlog.description,
        image: updatedBlog.image,
        content: updatedBlog.content,
        createdAt: updatedBlog.createdAt,
        likes: updatedBlog.likes,
      },
    });
  } else {
    res.status(404).json({ message: "Blog not found", success: false });
  }
});

// @desc publish Blog
// @route PUT /api-v1/blog/publish/:id
// @access Private
const publishBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    blog.published = !blog.published;
    blog.isDraft = false;
    const updatedBlog = await blog.save();
    res.status(200).json({
      success: true,
      message: `Blog ${blog.published ? "published" : "unpublished"} successfully.`,
      data: {
        id: updatedBlog._id,
        title: updatedBlog.title,
        description: updatedBlog.description,
        image: updatedBlog.image,
        content: updatedBlog.content,
        createdAt: updatedBlog.createdAt,
        published: updatedBlog.published,
      },
    });
  } else {
    res.status(404).json({ message: "Blog not found", success: false });
  }
});

// @isArchived Blog
// @route PUT /api-v1/blog/archive/:id
// @access Private
const archiveBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    blog.isArchived = !blog.isArchived;
    const updatedBlog = await blog.save();
    res.status(200).json({
      success: true,
      message: `Blog ${blog.isArchived ? "archived" : "unarchived"} successfully.`,
      data: {
        id: updatedBlog._id,
        title: updatedBlog.title,
        description: updatedBlog.description,
        image: updatedBlog.image,
        content: updatedBlog.content,
        createdAt: updatedBlog.createdAt,
        isArchived: updatedBlog.isArchived,
      },
    });
  } else {
    res.status(404).json({ message: "Blog not found", success: false });
  }
});

module.exports = {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteMultipleBlogs,
  likeBlog,
  publishBlog,
  archiveBlog,
};