require("dotenv").config();
const express = require("express");
const connectToDB = require("./database");
const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "This is homepage",
  });
});

app.get("/about", (req, res) => {
  res.json({
    message: "This is about page!",
  });
});

app.listen(process.env.PORT, () => {
  connectToDB();
  console.log("Nodejs server has started at 3000!");
});
