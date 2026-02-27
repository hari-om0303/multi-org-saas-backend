const becrypt = require('bcryptjs');
const Organization = require('../organization/organization.model');
const User = require('../user/user.model');
const generateToken = require('../../utils/jwt');

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

module.exports = {register};