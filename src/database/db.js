const mongoose = require('mongoose');

const connectDB = async () =>{
      try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
      }catch(err){
        console.error("error connecting to MongoDB", err.message);
         process.exit(1); // used to exit the process with failure
      }
};

module.exports = connectDB;
