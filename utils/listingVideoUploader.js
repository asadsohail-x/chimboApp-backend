const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./videos/listings",
  filename: (_, file, cb) => {
    cb(null, uuidv4() + "_" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (_, file, cb) => {
  const allowedTypes = [
    "video/mp4",
    "video/mov",
    "video/avi",
    "video/mkv",
    "video/flv",
    "video/wmv",
    "video/ogg",
    "video/svg",
    "video/avchd",
    "video/f4v",
    "video/swf",
    "video/webm",
    "video/mpeg-2",
  ];
  if (!allowedTypes.includes(file.mimetype))
    cb(new Error("File Format not supported"), false);
  cb(null, true);
};
const uploader = multer({ storage, fileFilter });

module.exports = (fieldName, req, res, next) => {
  const upload = uploader.single(fieldName);

  upload(req, res, (e) => {
    try {
      if (e instanceof multer.MulterError) {
        throw e;
      } else if (e) {
        throw "Video format not supported";
      }
      next();
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  });
};
