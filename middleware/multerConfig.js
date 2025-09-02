const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./storage"); //null in case of error and store file in storage folder in case of success
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

module.exports = {
  multer,
  storage,
};
