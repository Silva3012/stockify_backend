const mongoose = require('mongoose'); // Importing the mongoose library
const { Schema } = mongoose; // Destructuring to extract the schema object

// Define the schema for the holdings
const portfolioSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  stocks: [
    {
      ticker: { type: String, required: true },
      name: { type: String, required: true },
      currentPrice: { type: Number, required: true },
      purchasePrice: { type: Number, required: true },
      qty: { type: Number, required: true },
      totalValue: { type: Number, required: true },
      totalGainLoss: { type: Number, required: true },
      day_change: { type: Number, required: true },
    }
  ]
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
