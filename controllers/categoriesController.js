var express = require('express');
var router  = express.Router();
var Category = require('../models/category.js');

router.get('/', function(req, res) {
  Category.find({}).sort('title').exec(function(err, data) {
    res.json(data);
  });
});


router.post('/', function(req, res) {
  Category.create(req.body, function(err, data) {
    res.send(data);
  });
});

router.get('/seed', function(req, res) {
  var data = [
    {
      title: 'ExpressJS',
      concept: [
        {
          title: 'Router',
          img: '',
          stars: 2
        },
        {
          title: 'Static',
          img: '',
          stars: 1
        }
      ]
    },
    {
      title: 'Javascript',
      concept: [
        {
          title: 'If...else',
          img: '',
          stars: 3
        },
        {
          title: 'Loop',
          img: '',
          stars: 4
        },
        {
          title: 'Function',
          img: '',
          stars: 8
        }
      ]
    },
    {
      title: 'AngularJS',
      concept: [
        {
          title: 'Controller',
          img: '',
          stars: 5
        },
        {
          title: 'Directive',
          img: '',
          stars: 9
        },
        {
          title: 'Module',
          img: '',
          stars: 8
        }
      ]
    },
    {
      title: 'HTML',
      concept: [
        {
          title: 'Elements',
          img: '',
          stars: 3
        },
        {
          title: 'Script',
          img: '',
          stars: 2
        },
        {
          title: 'Form',
          img: '',
          stars: 6
        }
      ]
    },
    {
      title: 'CSS',
      concept: [
        {
          title: 'Selectors',
          img: '',
          stars: 2
        },
        {
          title: 'Anchors',
          img: '',
          stars: 3
        },
        {
          title: 'Classes',
          img: '',
          stars: 2
        }
      ]
    }
  ];

  Category.create(data, function(err, data) {
    res.redirect('/categories')
  });
});


module.exports = router;