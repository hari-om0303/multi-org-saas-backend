const becrypt = require('bcryptjs');
const bcrypt = require("bcrypt");
const Organization = require('../organization/organization.model');
const User = require('../user/user.model');
const generateToken = require('../../utils/jwt');

// register controller for creating new organization and user
const register = async (req , res )=>{
    try{
        const {orgName , name , email , password} = req.body;

        // check if organization already exists
        const existingOrg = await User.findOne({email});
        if(existingOrg){
            return res.status(400).json({message: 'Organization with this email already exists'});
        }

        // create new organization
        const organization = await Organization.create({name : orgName});
            
        // hashed password
        const hashedPassword = await becrypt.hash(password , 10);

        // create new user
        const newUser = await User.create({
            name ,
            email,
            password : hashedPassword,
            role : 'ORG_ADMIN',
            orgID : organization._id
        })

        // generate token
        const token = generateToken(newUser);
         
        res.status(201).json({
            message: "Organization and user created successfully",
            token,
         })
    }catch(err){
        res.status(500).json({message : err.message })
    }
}


//login controller for authenticating user and generating token 
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //  Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {register , login};