const asyncHandler = require("express-async-handler");
const { Blog } = require("../models/blog.model.js");

// @desc  add Blog
// @route POST /api-v1/blog?type="draft"
// @access Private
const createBlog = asyncHandler(async (req, res) => {
  const { type } = req.params
  const { title, description, image, content } = req.body;
  if (!title || !description || !image || !content) {
    res.status(400).json({ message: "Please fill all the fields", success: false });
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
      message: blog.isDraft ? "Draft saved" : "Blog added successfully",
    });
  } else {
    res.status(400).json({ message: "Something went wrong.", success: false });
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
      message: "All the messages are fetched successfully.",
      total: data.totalDocs,
      pageSize: data.limit,
      totalPages: data.totalPages,
      current: data.page,
      hasPrevPage: data.hasPrevPage,
      hasNextPage: data.hasNextPage,
      prevPage: data.prevPage,
      nextPage: data.nextPage,
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
      message: "Blog fetched successfully.",
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
    res.status(404).json({ message: "Blog not found", success: false });
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
  if (ids) {
    await Blog.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "Blogs deleted successfully", success: true });
  } else {
    res.status(400).json({ message: "Something went wrong", success: false });
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
    blog.published = true;
    blog.isDraft = false;
    const updatedBlog = await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog published successfully.",
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
    blog.isArchived = true;
    const updatedBlog = await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog archived successfully.",
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

// @desc unarchive Blog
// @route PUT /api-v1/blog/unarchive/:id
// @access Private
const unarchiveBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    blog.isArchived = false;
    const updatedBlog = await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog unarchived successfully.",
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
  unarchiveBlog,
};