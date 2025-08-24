const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent
   } = require("../controllers/studentController");

   const router = express.Router();

// Multer storage
   const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
   });
   const upload = multer({ storage });

// Routes
   router.post("/create", upload.single("image"), createStudent);
   router.get("/read", getAllStudents);
   router.put("/update/:id", updateStudent);
   router.delete("/delete/:id", deleteStudent);

   module.exports = router;
