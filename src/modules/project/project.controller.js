const Project = require("./project.model");
const withTenant = require("../../utils/tenant");

// create a project
const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
      orgId: req.user.orgId,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all projects for the organization
const getProjects = async (req, res) => {
  try {

    const projects = await Project.find(
      withTenant({ isActive: true }, req.user.orgId)
    );

    res.json({
      message: "Projects fetched successfully",
      count: projects.length,
      projects
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get project by id
const getProjectById = async (req, res) => {
  try {

    const project = await Project.findOne({
      _id: req.params.id,
      orgId: req.user.orgId,
      isActive: true
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.json({
      message: "Project fetched successfully",
      project
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// update project
const updateProject = async (req, res) => {
  try {

    const { title, description } = req.body;

    const project = await Project.findOne({
      _id: req.params.id,
      orgId: req.user.orgId,
      isActive: true
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    if (
      req.user.role !== "ORG_ADMIN" &&
      project.createdBy.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "You are not allowed to update this project"
      });
    }

    project.title = title || project.title;
    project.description = description || project.description;

    await project.save();

    res.json({
      message: "Project updated successfully",
      project
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// soft delete project
const deleteProject = async (req, res) => {
  try {

    const project = await Project.findOne({
      _id: req.params.id,
      orgId: req.user.orgId,
      isActive: true
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    // RBAC check
    if (
      req.user.role !== "ORG_ADMIN" &&
      project.createdBy.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "You are not allowed to delete this project"
      });
    }

    project.isActive = false;

    await project.save();

    res.json({
      message: "Project deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Implementing Cursor-Based Pagination
const getAllProjects = async (req, res) => {   //this getAllProjects == getProjects
  try {

    const limit = parseInt(req.query.limit) || 5;
    const cursor = req.query.cursor;

    let query = {
      orgId: req.user.orgId,
      isActive: true
    };

    // If cursor exists → fetch next records
    if (cursor) {
      query._id = { $gt: cursor };
    }

    const projects = await Project.find(query)
      .sort({ _id: 1 })   // important for cursor
      .limit(limit);

    const nextCursor =
      projects.length > 0
        ? projects[projects.length - 1]._id
        : null;

    res.json({
      count: projects.length,
      nextCursor,
      projects
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject, getProjects, getProjectById, updateProject, deleteProject, getAllProjects
};