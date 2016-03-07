var mongoose = require('mongoose');
var Concept = require('./concept.js');

var categorySchema = mongoose.Schema({
  title: {type: String, unique: true},
  concept: [Concept.schema]
});

module.exports = mongoose.model('Category', categorySchema);
