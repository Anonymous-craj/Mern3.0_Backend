require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const fs = require("fs");
const connectToDB = require("./database");
const { storage, multer } = require("./middleware/multerConfig");
const upload = multer({ storage: storage });
const Blog = require("./model/blogModel");

connectToDB();
app.get("/", (req, res) => {
  res.json({
    message: "This is homepage",
  });
});

//Create Operation
app.post("/blog", upload.single("image"), async (req, res) => {
  const { title, subtitle, description } = req.body;
  const { filename } = req.file;
  console.log(req.file);
  if (!title || !subtitle || !description) {
    return res.status(400).json({
      message: "All fields are required!",
    });
  }

  await Blog.create({
    title: title,
    subtitle: subtitle,
    description: description,
    image: filename,
  });
  res.status(200).json({
    message: "Table created successfully!",
  });
});

//Read Operation
app.get("/blog", async (req, res) => {
  const blogs = await Blog.find(); //returns array
  if (blogs.length == 0) {
    return res.status(404).json({
      message: "Data not found",
    });
  }
  res.status(200).json({
    message: "Blogs fetched successfully",
    data: blogs,
  });
});

//Single Read Operation
app.get("/blog/:id", async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findById(id); //returns object
  if (!blog) {
    return res.status(404).json({
      message: "Data not found",
    });
  }
  res.status(200).json({
    message: "Fetched successfully!",
    data: blog,
  });
});

//Delete Operation
app.delete("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  const imageName = blog.image;

  fs.unlink(`storage/${imageName}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File deleted successfully!");
    }
  });

  await Blog.findByIdAndDelete(id);
  res.status(200).json({
    message: "Blog deleted successfully!",
  });
});

//Update Operation
app.patch("/blog/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  const { title, subtitle, description } = req.body;
  let imageName;
  if (req.file) {
    imageName = req.file.filename;
    const blog = await Blog.findById(id);
    const oldimageName = blog.image;

    fs.unlink(`storage/${oldimageName}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File deleted successfully!");
      }
    });
  }

  await Blog.findByIdAndUpdate(id, {
    title,
    subtitle,
    description,
    image: imageName,
  });

  res.status(200).json({
    message: "Blog updated successfully!",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Nodejs server has started at 3000!");
});
