/**
 * Created by steve on 11/22/15.
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  email: String,
  first_name: String,
  last_name: String,
  address1: String,
  address2: String,
  city: String,
  zip_code: Number,
  state: String,
  password: String
});


module.exports = mongoose.model('User', userSchema);