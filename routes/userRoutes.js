const express = require('express');
const router = express.Router(); // Importing express router to define routes
const userController = require('../controllers/userController');

// User registration
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// User logout
router.get('/logout', userController.logoutUser);

// Facebook authentication routes
router.get('/auth/facebook', userController.facebookAuth);
router.get('/auth/facebook/stockify', userController.facebookAuthCallback);

// Google authentication routes
router.get('/auth/google', userController.googleAuth);
router.get('/auth/google/stockify', userController.googleAuthCallback);

module.exports = router;
