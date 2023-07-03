const User = require('../models/user');
const Portfolio = require('../models/portfolio');
const Watchlist = require('../models/watchlist');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Disable a user
const disableUser = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Disable the user
    user.disabled = true;
    await user.save();

    res.status(200).json({ message: 'User disabled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Enable a user
const enableUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Enable the user
    user.disabled = false;
    await user.save();

    res.status(200).json({ message: 'User enabled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// View user's portfolio
const viewUserPortfolio = async (req, res) => {
  const { userId } = req.params;

  try {
    const portfolio = await Portfolio.findOne({ user: userId });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// View user's watchlist
const viewUserWatchlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const watchlist = await Watchlist.findOne({ user: userId });
    if (!watchlist) {
      return res.status(404).json({ message: 'Watchlist not found' });
    }

    res.status(200).json(watchlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllUsers,
  disableUser,
  enableUser,
  viewUserPortfolio,
  viewUserWatchlist,
};
