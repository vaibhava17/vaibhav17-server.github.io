const asyncHandler = require("express-async-handler");
const { Project } = require("../models/project.model.js");

// @desc  add Project
// @route POST /api-v1/project
// @access Private
const createProject = asyncHandler(async (req, res) => {
  const data = req.body;
  const project = await Project.create(data);
  if (project) {
    res.status(201).json({
      id: project._id,
      success: true,
      message: "Project added successfully",
    });
  } else {
    res.status(400).json({ message: "Something went wrong.", success: false });
  }
});

// @desc  Get all Projects
// @route GET /api-v1/project
// @access Public
const getProjects = asyncHandler(async (req, res) => {
  const { current, pageSize, sortField, sortOrder, search } = req.query;
  let query = [
    {
      $match: {
        $or: [
          { name: { $regex: search ? search : "", $options: "i" } },
          { description: { $regex: search ? search : "", $options: "i" } },
          { owner: { $regex: search ? search : "", $options: "i" } },
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
  return Project.aggregatePaginate(Project.aggregate(query), option).then((data) => {
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
          name: item.name,
          description: item.description,
          githubURL: item.githubURL,
          owner: item.owner,
          webURL: item.webURL,
          publishedAt: item.publishedAt,
        };
      }),
    });
  });
});

// @desc  Get single Project
// @route GET /api-v1/project/:id
// @access Public
const getSingleProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    res.status(200).json({
      success: true,
      message: "Project fetched successfully.",
      data: {
        id: project._id,
        name: project.name,
        description: project.description,
        githubURL: project.githubURL,
        owner: project.owner,
        webURL: project.webURL,
        publishedAt: project.publishedAt,
      },
    });
  } else {
    res.status(404).json({ message: "Blog not found", success: false });
  }
});

// @desc  Update Project
// @route PUT /api-v1/project/:id
// @access Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.githubURL = req.body.githubURL || project.githubURL;
    project.owner = req.body.owner || project.owner;
    project.webURL = req.body.webURL || project.webURL;
    project.publishedAt = req.body.publishedAt || project.publishedAt;
    const updatedProject = await project.save();
    res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      data: {
        id: updatedProject._id,
        name: updatedProject.name,
        description: updatedProject.description,
        githubURL: updatedProject.githubURL,
        owner: updatedProject.owner,
        webURL: updatedProject.webURL,
        publishedAt: updatedProject.publishedAt,
      },
    });
  } else {
    res.status(404).json({ message: "Blog not found", success: false });
  }
});

// @desc  Delete Project
// @route DELETE /api-v1/project/:id
// @access Private
const deleteMultipleProjects = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (ids) {
    await Project.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "Projects deleted successfully", success: true });
  } else {
    res.status(400).json({ message: "Something went wrong", success: false });
  }
});

module.exports = {
  createProject,
  getProjects,
  getSingleProject,
  updateProject,
  deleteMultipleProjects,
};