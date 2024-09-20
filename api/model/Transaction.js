const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  type: {
    type: String,
    required: true,
    enum: ["income", "expense", "investment"],
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    default: "Uncategorized",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
