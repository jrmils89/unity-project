var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var db = mongoose.connection;
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/flow-ly';

//connection form heroku deployment
mongoose.connect(mongoUri);

app.use(express.static('public'));//access public files aka client side files
app.engine('html', require('ejs').renderFile);// requirement for ospry uploading


app.use(bodyParser.urlencoded({ extended: false })); //access form data
app.use(bodyParser.json());


require('./config/passport')(passport); // require passport configuration


app.use(session({ secret: 'flowlyapplication' })); //to hide ospry key



app.use(passport.initialize());// Using passport
app.use(passport.session());//session persistence for user login


var categoriesController = require('./controllers/categoriesController.js');//access categories controller
var usersController = require('./controllers/usersController.js');//access users controller
app.use('/api/v1/categories', categoriesController);//use this route uri
app.use('/api/v1/users', usersController);

//on home
app.get('/', function(req, res) {
  //if user is not authenticated clear cookie data
  if (!req.isAuthenticated()) {
    res.clearCookie('userid');
    res.clearCookie('userUsername');
    res.clearCookie('userEmail');
    res.clearCookie('userIsAdmin');
  };
  // allows routes to be accessed without navigating through home
  //ability to refresh page based on cookie history
  //if user was on certain page, the cookie history is set
  res.clearCookie('redirectUrlFlowLy');
  var url = req.session.valid || 'null';
  res.cookie('redirectUrlFlowLy', url);
  req.session.valid = null;
  res.render('../public/home.html');
});

//accepts special characters in uri
app.get(/^((?!\/api).)*$/, function(req, res) {
  req.session.valid = req.originalUrl;
  res.redirect('/');
});


//open database connection
db.once('open', function() {
  console.log("Mongoose open");
  app.listen(port, function() {
    console.log("listening");
  });
});