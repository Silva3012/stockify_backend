const mongoose = require('mongoose'); // Importing the mongoose library
const { Schema } = mongoose; // Destructuring to extract the schema object

// Define the schema for the holdings
const holdingsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ticker: { type: String, required: true }, // Ticker symbol of the holding
  description: { type: String, required: true }, // Description or name of the holding
  currentPrice: { type: Number, required: true }, // Current price of the holding
  purchasePrice: { type: Number, required: true }, // Purchase price of the holding
  qty: { type: Number, required: true }, // Quantity or number of shares held
  totalValue: { type: Number, required: true }, // Total value of the holding
  totalGainLoss: { type: Number, required: true }, // Total gain or loss of the holding
});

const Holdings = mongoose.model('Holdings', holdingsSchema);

module.exports = Holdings;
