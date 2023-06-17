const mongoose = require('mongoose'); // Importing the mongoose library
const { Schema } = mongoose; // Destructuring to extract the schema object

// Define the schema for the holdings
const portfolioSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
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

// Define a virtual property to calculate the total portfolio amount
portfolioSchema.virtual('totalPortfolioAmount').get(function () {
  let totalValue = this.amount;

  this.stocks.forEach((stock) => {
    totalValue += stock.totalValue;
  });

  return totalValue;
});


const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
