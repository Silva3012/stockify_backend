const Watchlist = require('../models/watchlist');

// Function to get the stocks from the user's watchlist
exports.getWatchlistStocks = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId)

        // Find the watchlist for the user
        const watchlist = await Watchlist.findOne({ user: userId });

        if (!watchlist) {
            return res.status(404).json({ error: 'Watchlist not found' });
        }

        // Extract the stocks from the watchlist
        const stocks = watchlist.stocks;

        res.status(200).json({ stocks });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to add a stock to the watchlist
exports.addToWatchlist = async (req, res) => {
    try {
        const { ticker, price, day_change, name} = req.body;
        const userId = req.user._id;;

        // Check if the stock already exist in the user's watchlist
        const existingStock = await Watchlist.findOne({
            user: userId,
            'stocks.ticker': ticker,
        });

        if (existingStock) {
            return res.status(400).json({ error: 'Stock already exists in watchlist' });
        }

        // Add the stock to the user's watchlist
        await Watchlist.findOneAndUpdate(
            { user: userId },
            {
                $push: {
                    stocks: { ticker, price, day_change, name },
                },
            },
            { upsert: true } // Create a new watchlist if it doesn't exist for the user. 
        );

        res.status(200).json({ message: 'Stock added to watchlist '});
        } catch (error) {
          console.log('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
    };
};

// Function to remove a stock from the watchlist
exports.removeFromWatchlist = async (req, res) => {
    try {
        const { ticker } = req.params;
        const userId = req.user._id;;

        // Remove the stock from the user's watchlist
        await Watchlist.findOneAndUpdate(
            { user: userId },
            {
                $pull: {
                    stocks: { ticker },
                },
            }
        );

        res.status(200).json({ message: 'Stock removed from watchlist' });
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


/*
Some references:

$push: https://www.mongodb.com/docs/v6.0/reference/operator/update/push/
findOneAndUpdate: https://www.mongodb.com/docs/v6.0/reference/method/db.collection.findOneAndUpdate/

*/