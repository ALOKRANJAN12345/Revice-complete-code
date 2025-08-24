   const studentModel = require("../models/student");

    const getAllRecord = async (req,res)=> {
     const students = await studentModel.find();
     res.json(students);
      };

     const createNewRecord = async (req,res)=> {
       try {
         const data = new studentModel({
           name: "ajay",
            age: 23,
            city: "delhi",
            fees: 2300.5
           });
           await data.save();
          res.json({ success: true, data });
       } catch (error) {
          res.status(500).json({ success:false, message:error.message });
         }
       };

     const readRecordById = async (req,res)=> {
      const student = await studentModel.findById(req.params.id);
       res.json(student);
     };

     const updateRecordById = async (req,res)=> {
     const student = await studentModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(student);
     };

    const deleteRecordById = async (req,res)=> {
  await studentModel.findByIdAndDelete(req.params.id);
  res.json({success:true});
      };

    module.exports = { getAllRecord, createNewRecord, readRecordById, updateRecordById, deleteRecordById };
