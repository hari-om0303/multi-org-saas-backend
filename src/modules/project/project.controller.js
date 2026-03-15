const Project = require("./project.model");

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

const getProjects = async (req, res) => {
  try {

    const projects = await Project.find({
      orgId: req.user.orgId,
      isActive: true
    });

    res.json({
      message: "Projects fetched successfully",
      count: projects.length,
      projects
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

module.exports = {
  createProject, getProjects , getProjectById , updateProject
};