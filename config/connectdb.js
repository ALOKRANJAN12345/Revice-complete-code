    const mongoose = require('mongoose');

       const connectDB = async (DATABASE_URL) => {
               try {
               const DB_OPTIONS = { dbName: 'crud' };
               const data = await mongoose.connect(DATABASE_URL, DB_OPTIONS);
                  console.log(data ? 'MongoDB Connected!' : 'Connection Failed');
                      } catch (error) {
                  console.log(error.message);
               }
             };

           module.exports = connectDB;
