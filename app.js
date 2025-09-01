require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const connectToDB = require("./database");

app.get("/", (req, res) => {
  res.json({
    message: "This is homepage",
  });
});

app.post("/blog", (req, res) => {
  console.log(req.body);
  res.status(200).json({
    message: "Blog api triggered!",
  });
});

app.listen(process.env.PORT, () => {
  connectToDB();
  console.log("Nodejs server has started at 3000!");
});
