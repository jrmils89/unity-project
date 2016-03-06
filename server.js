var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var db = mongoose.connection;
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');


mongoose.connect('mongodb://localhost/flow-ly');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./config/passport')(passport);


app.use(session({ secret: 'flowlyapplication' }));

// Using passport
app.use(passport.initialize());
app.use(passport.session());

var categoriesController = require('./controllers/categoriesController.js');
var usersController = require('./controllers/usersController.js');
app.use('/categories', categoriesController);
app.use('/users', usersController);



db.once('open', function() {
  console.log("Mongoose open");
  app.listen(port, function() {
    console.log("listening");
  });
});
