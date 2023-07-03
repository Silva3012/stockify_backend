const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/adminUser');
require('dotenv').config();

// Controller for adminUser registration
const registerAdminUser = async (req, res) => {
    // Extract the required fields from the request body
    const { name, email, password } = req.body;

    console.log(req.body);

  try {
    // Check if the username already exists
    const existingUser = await AdminUser.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'AdminUser already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new adminUser with the hashed password
    const adminUser = new AdminUser({
      username: email,
      name,
      email,
      password: hashedPassword,
    });

    // Save the adminUser to the database
    await adminUser.save();

    // Return a success message
    res.status(201).json({ message: 'AdminUser registered successfully' });
  } catch (error) {
    // Handle any errors that occur during registration
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// Controller for adminUser login
const loginAdminUser = async (req, res) => {
  try {
    // Extract the required fields from the request body
    const { email, password } = req.body;

    // Find the adminUser with the given username
    const adminUser = await AdminUser.findOne({ email });
    if (!adminUser) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, adminUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ adminUserId: adminUser._id },  process.env.JWT_SECRET, { expiresIn: '24h' });

    // Return the token and a success message
    res.status(200).json({ token, message: 'AdminUser logged in successfully' });
  } catch (error) {
    // Handle any errors that occur during login
    res.status(500).json({ message: 'Login failed' });
  }
};

module.exports = { registerAdminUser, loginAdminUser };
