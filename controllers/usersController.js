// using express to pass data from and to client
var express = require('express');
var router  = express.Router();
var User = require('../models/user.js');
var passport = require('passport');

// if you are an admin, express will find and display a list of all of the users 
router.get('/', isAdmin, function(req, res) {
  User.find({}, function(err, data) {
    res.json(data);
  });
});


// if you are a new user and sign-up, passport will authenticate that information
router.post('/signup', passport.authenticate('local-signup', {failureRedirect: '/' }), function(req, res) {
    // that user information is now being requested by the cookies API
    res.cookie('userid', req.user.id);
    res.cookie('userUsername', req.user.username);
    res.cookie('userEmail', req.user.email);
    res.cookie('userIsAdmin', req.user.isAdmin);
    // sending the successfully created user data to the browser
    res.json({success: true});
  }
);


router.post('/login', passport.authenticate('local-login', {failureMessage: 'fail'}), function(req, res) {
    // When the user successfully logs 3 different cookies are set, that will be user on the front end side
    res.cookie('userid', req.user.id);
    res.cookie('userUsername', req.user.username);
    res.cookie('userEmail', req.user.email);
    res.cookie('userIsAdmin', req.user.isAdmin);
    res.json(req.user)
  }
);

router.get('/logout', function(req, res) {
    // When the user logs out the request is logged out and the cookies that were set upon login are cleared out
    req.logout();
    res.clearCookie('userid');
    res.clearCookie('userUsername');
    res.clearCookie('userEmail');
    res.clearCookie('userIsAdmin');
    res.json({success: true})
  });

router.put('/:id', function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, data) {
    res.json(data);
  });
});

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/');
}


function isAdmin(req, res, next) {
  // if user is an admin in the session, carry on
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  // if they aren't redirect them to the home page
  res.sendStatus(404);
}



module.exports = router;