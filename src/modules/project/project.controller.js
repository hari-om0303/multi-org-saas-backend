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

module.exports = {
  createProject, getProjects
};