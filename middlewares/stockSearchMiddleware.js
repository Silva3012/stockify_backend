require('dotenv').config(); // Load enviroment variables from .env file
const fetch = require('isomorphic-fetch');

const stockSearchMiddleware = async (req, res, next) => {
    const searchQuery = req.query.symbols // The search term is passed as a query parameter

    const params = {
        api_token: process.env.STOCKDATA_API_TOKEN, // Retrieve API key from environment variable
        symbols: searchQuery, // Add the search term to the params object
    };

    // encodeURIComponent function for URL encoding
    const esc = encodeURIComponent;

    // Generate the query string by iterating over the params object
    // and encoding each key-value pair
    const query = Object.keys(params)
        .map((k) => esc(k) + '=' + esc(params[k]))
        .join('&');
    
    // Set the request options for the fetch function
    const requestOptions = {
        method: 'GET',
    };

    // Fetch the stock data from the API
    try {
    const response = await fetch(`https://api.stockdata.org/v1/data/quote?${query}`, requestOptions);
    if (response.ok) {
      const result = await response.json();
      const suggestions = result.data.map((stock) => ({
        symbol: stock.ticker,
        companyName: stock.name,
      }));
      req.stockResults = result.data;
      res.json({ suggestions, searchResults: result.data});
    } else {
      throw new Error('API request failed');
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = stockSearchMiddleware;
