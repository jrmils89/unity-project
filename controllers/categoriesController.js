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
  var cats = [
    {
      title: 'ExpressJS',
      concept: [
        {
          title: 'Router',
          img: '',
          stars: 2,
          approved: true
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
          approved: true
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
          approved: true
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
          approved: true
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
          approved: true
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
          approved: true
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

  console.log(cats)

  Category.create(cats, function(err, data) {
    res.json(data);
  });
});


//get info by name
router.get("/:name", function(req, res){
  Category.find({title:req.params.name}, function(error, data){
    res.send(data);
  });
});




// edit concepts within category
router.put('/:name', function(req, res){
    Category.findOneAndUpdate(
      { "title": req.params.name, "concept._id": req.body._id },
      {
        "$set": {
            "concept.$": req.body
        }
    },
    function(err, data) {
      res.send(data);
    }
      )
});







module.exports = router;