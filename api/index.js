const express = require('express');
const path = require('path');
const userModel = require('../models/user'); // go up one folder to reach models

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));  // important for serverless
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req, res) => {
  res.render("index");
});

app.get('/read', async (req, res) => {
  const users = await userModel.find();
  res.render("read", { users });
});

app.get('/edit/:userid', async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.userid });
  res.render("edit", { user });
});

app.post('/update/:userid', async (req, res) => {
  const { image, name, email } = req.body;
  await userModel.findOneAndUpdate(
    { _id: req.params.userid },
    { image, name, email },
    { new: true }
  );
  res.redirect("/read");
});

app.get('/delete/:id', async (req, res) => {
  await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.post('/create', async (req, res) => {
  const { name, email, image } = req.body;
  await userModel.create({ name, email, image });
  res.redirect("/read");
});

// Export for Vercel
module.exports = app;
