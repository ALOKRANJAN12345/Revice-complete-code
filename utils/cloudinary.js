     const multer = require('multer');
   const path = require('path');
   const { v2: cloudinary } = require('cloudinary');
    const fs = require('fs');

   cloudinary.config({
    cloud_name: 'dkfixkscn',
    api_key: '399259337297136',
    api_secret: 'mhjyGZ8EjfuEI92UVTmH7SdXo48'
    });

    const storage = multer.diskStorage({
     filename: (req, file, cb) => {
       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
     }
    });

    const upload = multer({ storage });

   module.exports = { cloudinary, upload };
