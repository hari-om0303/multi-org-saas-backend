const express = require("express");
const router = express.Router();
const authMiddleware = require('../../middlewares/auth.middleware')
const {createProject } = require('./project.controller')


router.get('/', authMiddleware , (req,res)=>{
    res.json({
        message : "Protected route accessed",
        user : req.user,
    });
});

router.post("/", authMiddleware, createProject);

module.exports = router;


