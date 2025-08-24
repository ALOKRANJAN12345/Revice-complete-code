// const express = require('express');

// const app = express();
// const path = require('path');
// const userModel = require('./models/user')

// app.set("view engine", "ejs");
// app.use(express.json());
// app.use(express.urlencoded({ extended: true}));
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.render("index")
// })

//   app.get('/read', async (req,res) => {

//     let users = await userModel.find();
//     res.render("read", {users});
//   })

//   app.get('/edit/:userid', async (req,res) => {
//      let user = await userModel.findOne({_id: req.params.userid});
//      res.render("edit", {user});
//   })

//     app.post('/update/:userid', async (req, res) => {
//       let {image,name,email} = req.body;
//        let user = await userModel.findOneAndUpdate({_id: req.params.userid}, {image, name, email}, {new:true});
//        res.redirect("/read");

//     });


//     app.get('/delete/:id', async (req, res) => {
//       let users = await userModel.findOneAndDelete({_id: req.params.id});

//       res.redirect("/read");
//     })

//     app.post('/create', async (req,res) => {
//         let {name, email, image} = req.body;
//      let createdUser = await userModel.create({
//         name,
//         email,
//         image
//       });

//       res.redirect("/read");
//   })

//   app.listen(4000, () => {
//   console.log('Server running at http://localhost:4000');
// });


const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.render("index");
});

// Health check route to verify server is live
app.get('/status', (req, res) => {
  res.send('✅ Backend is live and running successfully!');
});

// Read users
app.get('/read', async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
});

// Edit user
app.get('/edit/:userid', async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.userid });
  res.render("edit", { user });
});

// Update user
app.post('/update/:userid', async (req, res) => {
  let { image, name, email } = req.body;
  await userModel.findOneAndUpdate({ _id: req.params.userid }, { image, name, email }, { new: true });
  res.redirect("/read");
});

// Delete user
app.get('/delete/:id', async (req, res) => {
  await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

// Create user
app.post('/create', async (req, res) => {
  let { name, email, image } = req.body;
  await userModel.create({ name, email, image });
  res.redirect("/read");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
