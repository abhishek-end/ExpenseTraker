const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected To Database ");
  } catch (error) {
    console.log("Error Connecting To Database");
  }
};
module.exports = connectDB;
