const fetch = require('isomorphic-fetch');
const mongoose = require('mongoose');
const Watchlist = require('../models/watchlist');
const Portfolio = require('../models/portfolio');


// Function to fetch stock data for watchlist
const fetchStockDataForWatchlist = async () => {
  try {
    // Fetch watchlist symbols from the API
    const watchlistResponse = await fetch('http://localhost:3001/api/stocks/watchlist');
    if (!watchlistResponse.ok) {
      throw new Error('Failed to fetch watchlist symbols');
    }

    const watchlistData = await watchlistResponse.json();
    const watchlistSymbols = watchlistData.stocks.map((stock) => stock.ticker);

    // Make the API call to retrieve stock data using the watchlist symbols
    const params = {
      api_token: process.env.STOCKDATA_API_TOKEN,
      symbols: watchlistSymbols.join(','),
    };

    const query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');

    const stockDataResponse = await fetch(`https://api.stockdata.org/v1/data/quote?${query}`, { method: 'GET' });

    if (stockDataResponse.ok) {
      const stockData = await stockDataResponse.json();
      return stockData;
    } else {
      throw new Error('Failed to fetch stock data for watchlist');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};


// Function to update watchlist data in the database
const updateWatchlistData = async (data) => {
  try {
    const { user, stocks } = data; // Destructure the user and stocks data

    // Find the watchlist document based on the user ID
    const watchlist = await Watchlist.findOne({ user });

    if (watchlist) {
      // Update the stocks array with the received data
      watchlist.stocks = stocks;
    } else {
      // If watchlist document doesn't exist, create a new one
      const newWatchlist = new Watchlist({ user, stocks });
      await newWatchlist.save();
    }

    // Save the changes to the database
    await watchlist.save();

    console.log('Watchlist data updated successfully');
  } catch (error) {
    console.error('Error updating watchlist data:', error);
  }
};

// Function to fetch stock data for portfolio
const fetchStockDataForPortfolio = async () => {
  try {
    // Fetch portfolio symbols from http://localhost:3001/api/stocks/portfolio/
    const response = await fetch('http://localhost:3001/api/stocks/portfolio/');
    
    if (!response.ok) {
      throw new Error('Failed to fetch portfolio symbols');
    }
    
    const { portfolio } = await response.json();
    
    // Extract the symbols from the portfolio data
    const portfolioSymbols = portfolio.map(stock => stock.ticker);
    
    const params = {
      api_token: process.env.STOCKDATA_API_TOKEN,
      symbols: portfolioSymbols.join(','),
    };
  
    const query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
  
    const requestOptions = {
      method: 'GET',
    };
  
    const stockDataResponse = await fetch(`https://api.stockdata.org/v1/data/quote?${query}`, requestOptions);
  
    if (stockDataResponse.ok) {
      const stockData = await stockDataResponse.json();
      return stockData;
    } else {
      throw new Error('Failed to fetch stock data for portfolio');
    }
  } catch (error) {
    console.error('Error fetching stock data for portfolio:', error);
  }
};


// Function to update portfolio data in the database
const updatePortfolioData = async (data) => {
  try {
    // Iterate over the data and update each stock in the portfolio
    for (const stockData of data) {
      const { ticker, name, currentPrice, purchasePrice, qty, totalValue, totalGainLoss, day_change } = stockData;

      // Find the portfolio document for the given stock ticker
      const portfolio = await Portfolio.findOne({ 'stocks.ticker': ticker });

      // If the portfolio document is found, update the stock data
      if (portfolio) {
        const stockIndex = portfolio.stocks.findIndex((stock) => stock.ticker === ticker);
        if (stockIndex !== -1) {
          portfolio.stocks[stockIndex].name = name;
          portfolio.stocks[stockIndex].currentPrice = currentPrice;
          portfolio.stocks[stockIndex].purchasePrice = purchasePrice;
          portfolio.stocks[stockIndex].qty = qty;
          portfolio.stocks[stockIndex].totalValue = totalValue;
          portfolio.stocks[stockIndex].totalGainLoss = totalGainLoss;
          portfolio.stocks[stockIndex].day_change = day_change;
        }

        // Recalculate the total portfolio amount
        portfolio.amount = data.reduce((sum, stock) => sum + stock.totalValue, 0) || 0;

        // Save the updated portfolio document
        await portfolio.save();
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  fetchStockDataForWatchlist,
  updateWatchlistData,
  fetchStockDataForPortfolio,
  updatePortfolioData,
};
