const express = require("express");
const router = express.Router();
const authmiddleware = require('../../middlewares/auth.middleware')

router.get('/', authmiddleware , (req,res)=>{
    res.json({
        message : "Protected route accessed",
        user : req.user,
    });
});

module.exports = router;


