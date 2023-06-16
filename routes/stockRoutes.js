const express = require('express');
const router = express.Router();
const stockSearchMiddleware = require('../middlewares/stockSearchMiddleware');
const { getWatchlistStocks, addToWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');
const { verifyToken, checkLoggedIn } = require('../middlewares/auth');
const { addToPortfolio, sellStock, getPortfolio } = require('../controllers/portfolioController');

// Route for stock search
router.get('/search', stockSearchMiddleware, (req, res) => {
    const stockResults = req.stockResults; // Access the stock data from the request object
    res.json({ results: stockResults });
});

// Get user's watchlist
router.get('/watchlist', verifyToken, checkLoggedIn, getWatchlistStocks);

// Add a stock to the watchlist
router.post('/watchlist/add', verifyToken, checkLoggedIn, addToWatchlist);

// Remove a stock from the watchlist
router.delete('/watchlist/remove/:ticker', verifyToken, checkLoggedIn, removeFromWatchlist);

// Get user's portfolio
router.get('/portfolio', verifyToken, checkLoggedIn, getPortfolio);

// Add a stock to the portfolio
router.post('/portfolio/add', verifyToken, checkLoggedIn, addToPortfolio);

// Sell a stock from the portfolio
router.put('/portfolio/sell/:ticker', verifyToken, checkLoggedIn, sellStock);

module.exports = router;

