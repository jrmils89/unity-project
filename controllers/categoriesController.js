var express = require('express');
var router  = express.Router();
var Category = require('../models/category.js');

router.get('/', function(req, res) {
  Category.find({}, function(err, data) {
    res.json(data);
  });
});


router.post('/', function(req, res) {
  Category.create(req.body, function(err, data) {
    res.send(data);
  });
})


module.exports = router;