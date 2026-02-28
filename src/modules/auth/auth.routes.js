const express = require("express");
const router = express.Router();
const { register , login } = require("./auth.controller");

// Create Auth Routes
router.post("/register", register);
// add login route
router.post("/login" , login);

module.exports = router;
