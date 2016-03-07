var mongoose = require('mongoose');

var conceptSchema = mongoose.Schema({
  title: String,
  img: String,
  stars: Number,
  approved: Boolean
});

module.exports = mongoose.model('Concept', conceptSchema);
