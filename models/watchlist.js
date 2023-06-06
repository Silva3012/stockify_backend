const mongoose = require('mongoose'); // Importing the mongoose library
const { Schema } = mongoose; // Destructing to extract the Schema object

// Define the schema for the watchlist
const watchlistSchema  = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    stocks: [
        {
            ticker: { type: String, required: true }, // Ticker symbol of the stock
            price: { type: Number, required: true },  // Last price of the stock
            day_change: { type: Number, required: true },  // Percentage change for the day
            name: { type: String, required: true },  // Name of the stock
        },
    ],
});

// Create the Watchlist model based on the schema
const Watchlist = mongoose.model('Watchlist', watchlistSchema);

// Export the Watchlist model 
module.exports = Watchlist;