const express = require('express');
const stockSearchMiddleware = require('../middlewares/stockSearchMiddleware');
const router = express.Router();

// Route for stock search
router.get('/search', stockSearchMiddleware, (req, res) => {
    const stockResults = req.stockResults; // Access the stock data from the request object
    res.json({ results: stockResults });
});

module.exports = router;

/*

 Here we are creating a GET route for /search that utilizes the stockSearchMiddleware as middleware. 
 When this route is accessed, the middleware will be called first to fetch the stock data and store it in the stockResults property of the request object. 
 Then, in the route handler function, we can access the stock data from the request object and send it as a response.

*/