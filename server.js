var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var db = mongoose.connection;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/flow-ly');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));


var categoriesController = require('./controllers/categoriesController.js');

app.use('/categories', categoriesController);


db.once('open', function() {
  console.log("Mongoose open");
  app.listen(port, function() {
    console.log("listening");
  });
});
