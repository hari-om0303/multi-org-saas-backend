const express = require("express");
const router = express.Router();
const authMiddleware = require('../../middlewares/auth.middleware')
const {createProject , getProjects } = require('./project.controller')


// router.get('/', authMiddleware , (req,res)=>{
//     res.json({
//         message : "Protected route accessed",
//         user : req.user,
//     });
// });

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);

module.exports = router;


