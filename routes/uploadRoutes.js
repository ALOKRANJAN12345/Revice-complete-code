const express = require("express");
const multer = require("multer");
const path = require("path");
const { v2: cloudinary } = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Multer config (temporary disk storage)
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Upload page
router.get("/upload", (req, res) => {
  res.render("upload");
});

// Upload handler
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
    const file = req.file.path;

    const result = await cloudinary.uploader.upload(file, { folder: "node_js_express" });
    res.json({ success: true, url: result.secure_url });
  } catch (err) {
    res.status(500).json({ success: false, message: "Upload failed", error: err.message });
  }
});

module.exports = router;
