require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const connectToDB = require("./database");
const { storage, multer } = require("./middleware/multerConfig");
const upload = multer({ storage: storage });
const Blog = require("./model/blogModel");

app.get("/", (req, res) => {
  res.json({
    message: "This is homepage",
  });
});

app.post("/blog", upload.single("image"), async (req, res) => {
  const { title, subtitle, description, image } = req.file;
  // if (!title || !subtitle || !description || !image) {
  //   return res.status(400).json({
  //     message: "All fields are required!",
  //   });
  // }

  await Blog.create({
    title: title,
    subtitle: subtitle,
    description: description,
    image: image,
  });
  res.status(200).json({
    message: "Table created successfully!",
  });
});

app.listen(process.env.PORT, () => {
  connectToDB();
  console.log("Nodejs server has started at 3000!");
});
