const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./images/listings",
  filename: (_, file, cb) => {
    cb(null, uuidv4() + "_" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (_, file, cb) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
  if (!allowedTypes.includes(file.mimetype))
    cb(new Error("File Format not supported"), false);
  cb(null, true);
};

const uploader = multer({ storage, fileFilter });

module.exports = (fieldName, maxCount, req, res, next) => {
  const upload = uploader.array(fieldName, maxCount);

  upload(req, res, (e) => {
    try {
      if (e instanceof multer.MulterError) {
        throw e;
      } else if (e) {
        throw "Image format not supported";
      }
      next();
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  });
};
