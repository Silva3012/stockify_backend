const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const passport = require('../middlewares/authPassportMiddleware');
require('dotenv').config();

// User registration
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  console.log(req.body);

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Create a new user
    const newUser = new User({
      username: email, // Use email as the username
      name,
      email,
      password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    newUser.password = hashedPassword;

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Return a success response with the token
    return res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'An error occurred while registering user' });
  }
};

// User login 
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log('Login request - Email:', email, 'Password:', password);

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Return a success response with the token
    return res.status(200).json({ message: 'User logged in successfully', token });
  } catch (error) {
    console.log('Error authentication user:', error);
    return res.status(500).json({ message: 'Error authenticating user', error });
  }
};

// Controller to get username
const getUsername = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; 

  try {
    // Verify and decode the token to retrieve the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract the _id and name fields from the user document
    const { _id, name } = user;

    // Return the _id and name in the response
    return res.status(200).json({ _id, name });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'An error occurred while retrieving the username' });
  }
};



// User logout
const logoutUser = (req, res) => {
  // Handle logout logic here
  res.status(200).json({ message: 'User logged out successfully' });
};

// Facebook authentication
const facebookAuth = passport.authenticate('facebook');

// Facebook authentication callback
const facebookAuthCallback = passport.authenticate('facebook', {
  successRedirect: 'http://localhost:3000/dashboard',
  failureRedirect: 'login', 
});

// Google authentication 
const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Google authentication callback
const googleAuthCallback = passport.authenticate('google', {
  successRedirect: 'http://localhost:3000/dashboard',
  failureRedirect: 'login',
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUsername,
  facebookAuth,
  facebookAuthCallback,
  googleAuth,
  googleAuthCallback,
};