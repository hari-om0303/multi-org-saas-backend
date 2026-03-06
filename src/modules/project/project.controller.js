const Project = require("./project.model");

const createProject = async (req, res) => {
  try {
    console.log(req.user);
    
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

module.exports = {
  createProject,
};