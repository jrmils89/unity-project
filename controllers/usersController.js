var express = require('express');
var router  = express.Router();
var User = require('../models/user.js');
var passport = require('passport')


router.get('/', function(req, res) {
  User.find({}, function(err, data) {
    res.json(data);
  });
});

router.post('/', passport.authenticate('local-signup', {failureRedirect: '/' }),
  function(req, res) {
    res.json({success: true});
  }
);

//
// router.post('/', function(req, res) {
//   User.create(req.body, function(err, data) {
//     res.send(data);
//   });
// });


module.exports = router;