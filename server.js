require('dotenv').config(); 
const express = require('express'); // Importing the express module
const session = require('express-session'); // Importing express session middleware
const mongoose = require('mongoose'); // Importing Mongoose
const logger = require('morgan'); // To log on the termoinal
const cors = require('cors'); // Import the cors package
const passport = require('passport') // Importing passport
const userRoutes = require('./routes/userRoutes');
const stockRoutes = require('./routes/stockRoutes');
const {
  fetchStockDataForWatchlist,
  updateWatchlistData,
  fetchStockDataForPortfolio,
  updatePortfolioData,
} = require('./middlewares/stockDataSync');
const cron = require('node-cron');


let PORT = 3001 || process.env.PORT 

const app = express() // Instance of express

// Enable CORS for all routes
app.use(cors({
  origin: "http://localhost:3000"
}));

// Add express-session middleware
app.use(session({
  secret: 'This here is my secret',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport.js middleware 
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/stocks', stockRoutes); // Stock routes

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected...');

    // Schedule a task to run every 15 minutes
    cron.schedule('*/15 * * * *', async () => {
      try {
        // Fetch stock data for watchlist
        const watchlistData = await fetchStockDataForWatchlist();

        // Update the watchlist data in the database
        await updateWatchlistData(watchlistData);

        // Fetch stock data for portfolio
        const portfolioData = await fetchStockDataForPortfolio();

        // Update the portfolio data in the database
        await updatePortfolioData(portfolioData);

        console.log('Data synchronization completed successfully');
      } catch (error) {
        console.error('Error occurred during data synchronization:', error);
      }
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));


module.exports = app;