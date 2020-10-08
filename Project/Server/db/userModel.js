const mongoose = require('mongoose');
 
const User = new mongoose.Schema({
  FirstName: {
    type: String
  },
  LastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: String
  }
});
 
module.exports = userModel = mongoose.model('User', User);