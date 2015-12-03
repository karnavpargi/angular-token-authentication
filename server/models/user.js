/**
 * Created by steve on 11/22/15.
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  email: String,
  password: String
});


module.exports = mongoose.model('User', userSchema);