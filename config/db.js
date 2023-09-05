const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/e-commerce')
    console.log(`Connected to MongoDb ${conn.connection.host}`.bgYellow.green);

  } catch (error) {
    console.log(`Error in Mongodb ${error.message}`.bgRed.white);
    //exit after error
    process.exit(1);

  }
}

module.exports = connectDB;
