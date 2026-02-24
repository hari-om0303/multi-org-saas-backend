const jwt = require('jsonwebtoken');

// This function generates a JWT token for a given user. It takes the user's ID, organization ID, and role as payload and signs it with a secret key defined in the environment variables. The token also has an expiration time set in the environment variables.
const generateToken = (user) => {
    return jwt.sign({
        userId: user._id,
        orgId: user.orgId,
        role: user.role,
    },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )
}

module.exports = generateToken;