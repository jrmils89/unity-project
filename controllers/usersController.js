var express = require('express');
var router  = express.Router();
var User = require('../models/user.js');
var passport = require('passport');


router.get('/', isLoggedIn, function(req, res) {
  User.find({}, function(err, data) {
    res.json(data);
  });
});

router.post('/', passport.authenticate('local-signup', {failureRedirect: '/' }),
  function(req, res) {
    res.json({success: true});
  }
);

router.post('/login', passport.authenticate('local-login', {failureRedirect: '/users'}), function(req, res) {
    // When the user successfully logs 3 different cookies are set, that will be user on the front end side
    res.cookie('userid', req.user.id);
    res.cookie('userUsername', req.user.username);
    res.cookie('userEmail', req.user.email);
    res.json(req.user)
  }
);

router.get('/logout', function(req, res) {
    // When the user logs out the request is logged out and the cookies that were set upon login are cleared out
    req.logout();
    res.clearCookie('userid');
    res.clearCookie('userUsername');
    res.clearCookie('userEmail');
    res.json({success: true})
  });
//
// router.post('/', function(req, res) {
//   User.create(req.body, function(err, data) {
//     res.send(data);
//   });
// });

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/');
}



module.exports = router;