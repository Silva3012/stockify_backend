require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware function to verify the authenticity of a JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden: invalid or expired token'});
            }
            try {
                // Import the user model
                const User = require('../models/user');
                const user = await User.findById(decoded.userId);
                if (!user) {
                    return res.status(401).json({ message: 'Unauthorized: user not found' });
                }
                req.user = {
                    _id: user._id,
                    email: user.email
                };
                console.log('User', req.user);
                next();
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Server Error' });
            }
        });
    } else {
        return res.status(401).json({ message: 'Unauthorized: no token provided' });
    }
};

// Middleware function to check if a user is logged in
const checkLoggedIn = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: please log in' });
    }
    next();
};

module.exports = { verifyToken, checkLoggedIn };