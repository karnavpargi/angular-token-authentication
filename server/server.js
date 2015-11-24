/**
 * Created by steve on 11/22/15.
 */
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var path = require('path');

var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var configDB = require('./config/database.js');

var User = require('./models/user.js');

var jwt    = require('jsonwebtoken');

//console.log("User model: ", User);


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(configDB.url);
app.set('secret', configDB.secret);

app.all('/', function(req, res, next) {
  next();
});

// SIGNUP POST
app.post('/api/v1/consumer', function(req, res) {
  console.log("Create Email: ", req.body.email);
  console.log("Create Password: ", req.body.password);

  User.find({
    email: req.body.email
  }, function (err,user){
    var user = user[0];

    if(user){
      //res.status(500).send("User already exists");
      res.status(500).send({status:500, message: 'Email is Taken', type:'internal'});
      console.log('user already exists');
    }

    else{
      User.create(req.body, function(err, data) {
        //Then send back token
        res.status(200).send({status:200, message: 'Accepted Signup', type:'internal'});
      });
    }
  });





});

// LOGIN POST
app.post('/api/v1/sessions', function(req, res) {
  //console.log(User, req.body);
  console.log("POST initiated: ");
  User.find({
    email: req.body.email
  }, function(err, user){

    var user = user[0];

    // If user was not found
    if(!user) {
      res.status(500).send("User not found");
    } else {
      if(user.password == req.body.password) {
        var token = jwt.sign(user, app.get('secret'),{
          expiresIn: 1440 // No idea how long this is look up
        });
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      } else {
        res.status(500).send("Passwords do not match");
      }
    }
  });

  //  if(user){
  //    console.log("User not found");
  //    res.json({ success: false, message: 'Authentication failed. User not found'});
  //  } else {
  //    console.log(user.password, req.body.password);
  //    if (user.password != req.body.password){
  //      console.log("Passwords dont match");
  //      res.json({success: false, message: 'Authentication failed. Wrong Password'});
  //    } else{
  //      console.log("Yay!");
  //      var token = jwt.sign(user, app.get('superSecret'),{
  //        expiresInMinutes: 1440 // 24 hours
  //      });
  //
  //      res.json({
  //        success: true,
  //        message: 'Enjoy your token!',
  //        token: token
  //      });
  //    }
  //  }
  //});



});


app.get('/api/', function(req, res) {
  // Handle the get for this route
  User.findOne({}, function(err, data) {
    console.log(data);
    res.json({status: 200});
  });
});





//app.get('/api/', function(req, res) {
//  // render the page and pass in any flash data if it exists
//  res.send({"": ""});
//  res.send('posted successfully');
//});
//
//
//app.post('/', function(req, res) {
//  var obj = {};
//  // render the page and pass in any flash data if it exists
//  res.send(200, obj);
//});


app.listen(port);
console.log('Magic on port number ' + port);