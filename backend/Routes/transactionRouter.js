const transactionRouter = require("express").Router();
const TransactionController = require("../controller/transactionController");
const isAuthenticated = require("../middleware/isAuth");

// ! add
transactionRouter.post(
  "/api/v1/transaction/add",
  isAuthenticated,
  TransactionController.addTransaction
);
// !lists
transactionRouter.get(
  "/api/v1/transaction/lists",
  isAuthenticated,
  TransactionController.transactionFilter
);
//! update
transactionRouter.put(
  "/api/v1/transaction/:id",
  isAuthenticated,
  TransactionController.transactionUpdate
);
//!delete
transactionRouter.delete(
  "/api/v1/transaction/:id",
  isAuthenticated,
  TransactionController.transactionDelete
);
module.exports = transactionRouter;
