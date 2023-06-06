const bcrypt = require('bcrypt');
const passport = require('../passport');
const User = require('../models/user');

// User registration
exports.registerUser = async (req, res) => {
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
    });

    // Register the user with passport-local-mongoose
    await User.register(newUser, password);

    // Return a success response
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'An error occurred while registering user' });
  }
};

// User login
exports.loginUser = (req, res, next) => {
  const { email, password } = req.body; // Destructure email and password from req.body

  console.log('Login request - Email:', email, 'Password:', password);

  passport.authenticate('local', (err, user) => {
    console.log('Authentication result - Error:', err, 'User:', user);

    if (err) {
      console.log('Error authenticating user:', err);
      return res.status(500).json({ message: 'Error authenticating user', error: err });
    }
    if (!user) {
      console.log('Invalid email or password');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Log in the user
    req.logIn(user, (err) => {
      if (err) {
        console.log('Error logging in user:', err);
        return res.status(500).json({ message: 'Error logging in user', error: err });
      }
      console.log('User logged in successfully');
      return res.status(200).json({ message: 'User logged in successfully' });
    });
  })(req, res, next);
};


// User logout
exports.logoutUser = (req, res) => {
//   req.logout();
  res.status(200).json({ message: 'User logged out successfully' });
};

// // Facebook authentication
// exports.facebookAuth = passport.authenticate('facebook');

// // Facebook authentication callback
// exports.facebookAuthCallback = passport.authenticate('facebook', {
//   successRedirect: '/dashboard',
//   failureRedirect: '/login',
// });

// Google authentication
exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Google authentication callback
exports.googleAuthCallback = passport.authenticate('google', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
});
