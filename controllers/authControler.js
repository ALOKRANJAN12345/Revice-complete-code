    const userModel = require("../models/user");
     const bcrypt = require("bcrypt");
     const jwt = require("jsonwebtoken");

      const registerUser = async (req,res)=>{
             let {username,email,password,age} = req.body;
                  bcrypt.genSalt(10, (err, salt)=>{
                          bcrypt.hash(password, salt, async (err, hash)=>{
                   let createdUser = await userModel.create({ username, email, password: hash, age });
                  let token = jwt.sign({email}, "shhhhhhhhhhhh");
                        res.cookie("token", token);
      res.json(createdUser);
    });
  });
};

            const loginUser = async (req,res)=>{
                  let user = await userModel.findOne({email:req.body.email});
            if(!user) return res.send("User not found");
             bcrypt.compare(req.body.password, user.password, (err,result)=>{
            if(result){
             let token = jwt.sign({email:user.email},"shhhhhhhhhhhh");
                 res.cookie("token",token);
         res.send("Login successful");
    } else res.send("Invalid credentials");
  });
};

       const logoutUser = (req,res)=>{
            res.cookie("token","");
                  res.send("Logged out");
};

module.exports = { registerUser, loginUser, logoutUser };
