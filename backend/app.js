const express = require("express");
const errorHandle = require("./middleware/errorMiddleware");
const connectDB = require("./database/config");
const userRouter = require("./Routes/userRoute");
const categoryRouter = require("./Routes/categoryRoutes");
const transactionRouter = require("./Routes/transactionRouter");
require("dotenv").config();
const cors = require("cors");
// Initialize Express app
const app = express();
// Connect to the database
connectDB();

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

// Error-handling middleware
app.use(errorHandle);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
