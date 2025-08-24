    const jwt = require("jsonwebtoken");

   const authMiddleware = (req,res,next)=>{
  const token = req.cookies.token;
  if(!token) return res.status(401).send("Not authenticated");
     jwt.verify(token,"shhhhhhhhhhhh",(err,decoded)=>{
    if(err) return res.status(403).send("Invalid token");
    req.user = decoded;
    next();
  });
   };

    module.exports = authMiddleware;
