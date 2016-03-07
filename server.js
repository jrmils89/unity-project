var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var db = mongoose.connection;
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/flow-ly';


mongoose.connect(mongoUri);

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
