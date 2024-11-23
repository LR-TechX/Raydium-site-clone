// Import dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock exchange rates
const exchangeRates = {
  ETH: { SOL: 0.05, BTC: 0.002 },
  SOL: { ETH: 20, BTC: 0.0004 },
  BTC: { ETH: 500, SOL: 2500 },
};

// Routes
// Home route
app.get("/", (req, res) => {
  res.send("Raydium Clone Backend is Running!");
});

// Token swap route
app.post("/swap", (req, res) => {
  const { fromToken, toToken, amount } = req.body;

  // Validate input
  if (!fromToken || !toToken || !amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid input data." });
  }

  // Prevent swapping the same token
  if (fromToken === toToken) {
    return res.status(400).json({ error: "Cannot swap the same token." });
  }

  // Get the exchange rate
  const rate = exchangeRates[fromToken]?.[toToken];
  if (!rate) {
    return res.status(400).json({ error: "Exchange rate not available." });
  }

  // Calculate the converted amount
  const convertedAmount = amount * rate;

  // Respond with conversion details
  res.json({
    fromToken,
    toToken,
    amount,
    rate,
    convertedAmount,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
