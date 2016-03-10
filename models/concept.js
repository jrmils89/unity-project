var mongoose = require('mongoose');
var Category = require('./category.js');

var conceptSchema = mongoose.Schema({
  title: String,
  img: String,
  stars: {type: Number, default: 0},
  approved: {type: Boolean, default: false}
});







module.exports = mongoose.model('Concept', conceptSchema);
