const Student = require("../models/crudeSchema");
const cloudinary = require("cloudinary").v2;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
   });

   exports.createStudent = async (req, res) => {
  try {
    let result = null;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }

    const student = new Student({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      imageUrl: result ? result.secure_url : null
    });

    await student.save();
    res.status(201).json({ message: "Student created", student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  };

   exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
    };

     exports.updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
     } catch (err) {
    res.status(500).json({ error: err.message });
     }
   };

    exports.deleteStudent = async (req, res) => {
     try {
       await Student.findByIdAndDelete(req.params.id);
       res.json({ message: "Student deleted" });
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
   };
