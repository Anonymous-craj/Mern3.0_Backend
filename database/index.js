const mongoose = require("mongoose");

const connectToDB = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Database connected!");
};

module.exports = connectToDB;
