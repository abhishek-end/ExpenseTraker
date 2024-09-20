const asyncHandler = require("express-async-handler");
const Transaction = require("../model/Transaction");

const TransactionController = {
  //! add
  addTransaction: asyncHandler(async (req, res) => {
    const { type, amount, date, description, category } = req.body;
    if (!amount || !type || !category) {
      throw new Error("Amount and type field is required");
    }

    // !create category
    const transaction = await Transaction.create({
      user: req.user,
      type,
      category,
      amount,
      date,
      description,
    });

    res.status(201).json(transaction);
  }),
  //! lists
  transactionFilter: asyncHandler(async (req, res) => {
    const { startDate, endDate, type, category } = req.query;
    const filters = { user: req.user };

    if (startDate) {
      filters.date = { ...filters.date, $gte: new Date(startDate) };
    }

    if (endDate) {
      filters.date = { ...filters.date, $lte: new Date(endDate) };
    }
    if (type) {
      filters.type = type;
    }
    if (category && category !== "All") {
      if (category === "Uncategorized") {
        filters.category = "Uncategorized";
      } else {
        filters.category = category;
      }
    }
    const transaction = await Transaction.find(filters);
    res.json(transaction);
    console.log(filters);
  }),
  //!update
  transactionUpdate: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (transaction && transaction.user.toString() === req.user.toString()) {
      transaction.type = req.body.type || transaction.type;
      transaction.category = req.body.category || transaction.category;
      transaction.date = req.body.date || transaction.date;
      transaction.amount = req.body.amount || transaction.amount;
      transaction.description = req.body.description || transaction.description;
      const updatedTransaction = await transaction.save();
      res.json(updatedTransaction);
    }
  }),
  //!delete
  transactionDelete: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      await Transaction.findByIdAndDelete(req.params.id);
      res.json({ message: "Transaction Deleted" });
    }
    if (!transaction) {
      res.json({ message: "No Transaction Found to deleted" });
    }
  }),
};

module.exports = TransactionController;
