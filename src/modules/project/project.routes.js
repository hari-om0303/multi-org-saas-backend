const express = require("express");
const router = express.Router();
const authMiddleware = require('../../middlewares/auth.middleware')
const {createProject , getProjects , getProjectById , updateProject , deleteProject , getAllProjects} = require('./project.controller')


// router.get('/', authMiddleware , (req,res)=>{
//     res.json({
//         message : "Protected route accessed",
//         user : req.user,
//     });
// });

router.get("/all", authMiddleware, getAllProjects);  // paginated route 
router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProjectById);
router.put("/:id", authMiddleware,  updateProject);
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;


