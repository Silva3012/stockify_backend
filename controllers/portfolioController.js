const Portfolio = require('../models/portfolio');
let amount = 100000;

// Controller function to get user's portfolio
const getPortfolio = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the portfolio entry for the user
    const portfolio = await Portfolio.findOne({ user: userId });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Calculate the total portfolio amount
    const totalPortfolioAmount = portfolio.amount + portfolio.stocks.reduce((total, stock) => total + stock.totalValue, 0);

    // Add the totalPortfolioAmount field to the portfolio object
    const portfolioWithTotalAmount = { ...portfolio.toObject(), totalPortfolioAmount };

    res.json({ portfolio: portfolioWithTotalAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to add a stock to the user's portfolio
const addToPortfolio = async (req, res) => {
  try {
    const { ticker, name, currentPrice, purchasePrice, qty, day_change } = req.body;
    const totalValue = currentPrice * qty;
    const totalGainLoss = (currentPrice - purchasePrice) * qty;
    

    const existingPortfolio = await Portfolio.findOne({ user: req.user._id });

    if (existingPortfolio) {
      // User already has a portfolio, update the existing portfolio with the new stock
      const existingStock = existingPortfolio.stocks.find((stock) => stock.ticker === ticker);

      if (existingStock) {
        // Stock already exists in the portfolio, update the quantity and total value
        existingStock.qty += qty;
        existingStock.totalValue += totalValue;
        existingStock.totalGainLoss += totalGainLoss;
        existingStock.day_change = day_change;
      } else {
        // Stock does not exist in the portfolio, add it as a new stock
        const newStock = {
          ticker,
          name,
          currentPrice,
          purchasePrice,
          qty,
          totalValue,
          totalGainLoss,
          day_change,
        };

        existingPortfolio.stocks.push(newStock);
      }

      // Update the total value of the portfolio
      existingPortfolio.totalValue += totalValue;

      // Update the amount in the user's portfolio by subtracting the total value
      existingPortfolio.amount -= totalValue;

      // Calculate the new total portfolio amount
      existingPortfolio.totalPortfolioAmount = existingPortfolio.amount + existingPortfolio.totalValue + amount;

      await existingPortfolio.save();

      res.status(200).json({ portfolio: existingPortfolio });
    } else {
      res.status(404).json({ message: 'Portfolio not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



// Controller function to sell a specific quantity of a stock from the user's portfolio
const sellStock = async (req, res) => {
  try {
    const ticker = req.params.ticker;
    const { qty } = req.body;

    const portfolio = await Portfolio.findOne({ user: req.user._id });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    const stock = portfolio.stocks.find((stock) => stock.ticker === ticker);

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    if (stock.qty < qty) {
      return res.status(400).json({ message: 'Insufficient quantity for sale' });
    }

    const saleValue = stock.currentPrice * qty;

    // Update the stock quantity and total value after the sale
    const updatedStock = await Portfolio.findOneAndUpdate(
      { user: req.user._id, 'stocks.ticker': ticker },
      { $inc: { 'stocks.$.qty': -qty, 'stocks.$.totalValue': -saleValue } },
      { new: true }
    );

    // Update the amount in the user's portfolio by adding the sale value
    portfolio.amount += saleValue;

    // Remove the stock from the portfolio if the quantity reaches zero or update the stock quantity
    if (updatedStock.stocks.find((s) => s.ticker === ticker).qty === 0) {
      await Portfolio.findOneAndUpdate(
        { user: req.user._id },
        { $pull: { stocks: { ticker } } }
      );
    } else {
      await Portfolio.findOneAndUpdate(
        { user: req.user._id, 'stocks.ticker': ticker },
        { $set: { 'stocks.$.qty': updatedStock.stocks.find((s) => s.ticker === ticker).qty } }
      );
    }
    
    // Recalculate the total value of the portfolio
    portfolio.totalValue = portfolio.stocks.reduce((total, stock) => total + stock.totalValue, 0);

    // Recalculate the total portfolio amount
    portfolio.totalPortfolioAmount = portfolio.amount + portfolio.totalValue;

    // Save the changes to the portfolio object
    await portfolio.save();

    res.status(200).json({ message: 'Stock sold successfully', saleValue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
    getPortfolio,
    addToPortfolio,
    sellStock,
};