   const mongoose = require("mongoose");

   const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  imageUrl: String
    });

   module.exports = mongoose.model("Student", studentSchema);
