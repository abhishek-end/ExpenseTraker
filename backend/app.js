const express = require("express");
const errorHandle = require("./middleware/errorMiddleware");
const connectDB = require("./database/config");
const userRouter = require("./Routes/userRoute");
const categoryRouter = require("./Routes/categoryRoutes");
const transactionRouter = require("./Routes/transactionRouter");
require("dotenv").config();

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.use("/", userRouter); // Use routes with a prefix
app.use("/", categoryRouter); // Use routes with a prefix
app.use("/", transactionRouter); // Use routes with a prefix

// Error-handling middleware should be placed last
app.use(errorHandle);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
