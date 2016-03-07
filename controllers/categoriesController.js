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

//get regions info by name
router.get("/:name", function(req, res){
  Category.find({title:req.params.name}, function(error, data){
    res.send(data)
  })
})

router.get('/seed', function(req, res) {
  var data = [
    {
      title: 'ExpressJS',
      concept: [
        {
          title: 'Router',
          img: '',
          stars: 2,
          approved: false
        },
        {
          title: 'Static',
          img: '',
          stars: 1,
          approved: false
        }
      ]
    },
    {
      title: 'Javascript',
      concept: [
        {
          title: 'If...else',
          img: '',
          stars: 3,
          approved: false
        },
        {
          title: 'Loop',
          img: '',
          stars: 4,
          approved: false
        },
        {
          title: 'Function',
          img: '',
          stars: 8,
          approved: false
        }
      ]
    },
    {
      title: 'AngularJS',
      concept: [
        {
          title: 'Controller',
          img: '',
          stars: 5,
          approved: false
        },
        {
          title: 'Directive',
          img: '',
          stars: 9,
          approved: false
        },
        {
          title: 'Module',
          img: '',
          stars: 8,
          approved: false
        }
      ]
    },
    {
      title: 'HTML',
      concept: [
        {
          title: 'Elements',
          img: '',
          stars: 3,
          approved: false
        },
        {
          title: 'Script',
          img: '',
          stars: 2,
          approved: false
        },
        {
          title: 'Form',
          img: '',
          stars: 6,
          approved: false
        }
      ]
    },
    {
      title: 'CSS',
      concept: [
        {
          title: 'Selectors',
          img: '',
          stars: 2,
          approved: false
        },
        {
          title: 'Anchors',
          img: '',
          stars: 3,
          approved: false
        },
        {
          title: 'Classes',
          img: '',
          stars: 2,
          approved: false
        }
      ]
    }
  ];

  Category.create(data, function(err, data) {
    res.redirect('/categories')
  });
});


module.exports = router;