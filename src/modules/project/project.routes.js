const express = require("express");
const router = express.Router();
const authMiddleware = require('../../middlewares/auth.middleware')
const {createProject , getProjects , getProjectById , updateProject} = require('./project.controller')


// router.get('/', authMiddleware , (req,res)=>{
//     res.json({
//         message : "Protected route accessed",
//         user : req.user,
//     });
// });

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProjectById);
router.put("/:id", authMiddleware,  updateProject);

module.exports = router;


