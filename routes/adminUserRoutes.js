const express = require('express');
const adminUserController = require('../controllers/adminUserController');
const adminController = require('../controllers/adminController');
const router = express.Router();

// Admin user registration
router.post('/register', adminUserController.registerAdminUser);

// Admin user login
router.post('/login', adminUserController.loginAdminUser);

// Get all users
router.get('/users', adminController.getAllUsers);

// Disable a user
router.patch('/users/disable/:userId', adminController.disableUser);

// Enable a user
router.patch('/users/enable/:userId', adminController.enableUser);

// View user's portfolio
router.get('/users/portfolio/:userId', adminController.viewUserPortfolio);

// View user's watchlist
router.get('/users/watchlist/:userId', adminController.viewUserWatchlist);

module.exports = router;
