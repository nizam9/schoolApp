var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registerSchema = new Schema({

  username: {
    type: String
  },
  phone: {
    type: Number
  },
  password: {
    type: String
  },
  name: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  address: {
    type: String
  }
});

module.exports = mongoose.model('Register', registerSchema);