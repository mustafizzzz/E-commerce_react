const mongoose = require('mongoose');

const userScehma = new mongoose.Schema({
  //Blue print here
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 0
  }

}, { timestamps: true }//time show when new user created
)


//collection k andar gaya
const User = mongoose.model('users', userScehma);

module.exports = User;