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
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


require('./config/passport')(passport);


app.use(session({ secret: 'flowlyapplication' }));


// Using passport
app.use(passport.initialize());
app.use(passport.session());


var categoriesController = require('./controllers/categoriesController.js');
var usersController = require('./controllers/usersController.js');
app.use('/api/v1/categories', categoriesController);
app.use('/api/v1/users', usersController);

app.get('/', function(req, res) {
  if (!req.isAuthenticated()) {
    res.clearCookie('userid');
    res.clearCookie('userUsername');
    res.clearCookie('userEmail');
    res.clearCookie('userIsAdmin');
  };
  res.clearCookie('redirectUrlFlowLy');
  var url = req.session.valid || 'null';
  res.cookie('redirectUrlFlowLy', url);
  req.session.valid = null;
  res.render('../public/home.html');
});

app.get(/^((?!\/api).)*$/, function(req, res) {
  req.session.valid = req.originalUrl;
  res.redirect('/');
});



db.once('open', function() {
  console.log("Mongoose open");
  app.listen(port, function() {
    console.log("listening");
  });
});