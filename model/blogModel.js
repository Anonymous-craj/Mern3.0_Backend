const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: Text,
  },
  image: {
    type: String,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
