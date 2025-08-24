    const express = require("express");
    const { getAllRecord, createNewRecord, readRecordById, updateRecordById, deleteRecordById } = require("../controllers/crudController");
     const route = express.Router();

     route.get('/', getAllRecord);
     route.post('/create', createNewRecord);
     route.get('/read/:id', readRecordById);
     route.post('/update/:id', updateRecordById);
      route.get('/delete/:id', deleteRecordById);

       module.exports = route;
