var express = require('express');
var router  = express.Router();

//require category and concept models
var Category = require('../models/category.js');
var Concept = require("../models/concept.js")

router.get('/', function(req, res) {
// alphabetizes category name
  Category.find({}).sort('normalizedName').exec(function(err, data) {
    res.json(data);
  });
});

//CREATE ROUTE
router.post('/', function(req, res) {
  //accessed form data and lower cased name
  req.body.normalizedName = req.body.title.toLowerCase();
  //created catagory in database
  Category.create(req.body, function(err, data) {
    res.json(data);
  });
});

//CREATE
//create new concept on category name's uri
router.post("/:name", function(req, res){
  //newConcept = data from form
  var newConcept = new Concept(req.body);
  //finds specific category based on uri param
  //pushes new Concept into category.concept array and returns newly updated data
  Category.findOneAndUpdate({"title":req.params.name}, {$push: {concept: newConcept}}, {new: true}, function(err, data) {
     res.json(data)
   })
});

router.get('/ospry', function(req, res) {
  res.json({key: process.env.OSPRY_KEY});
})

//to seed data
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

  for (var i = 0; i < cats.length; i++) {
    //makes all titles lower cased by looping though each item
    cats[i].normalizedName = cats[i].title.toLowerCase();
  };

  //once route is hit, seed data created
  Category.create(cats, function(err, data) {
    res.json(data);
  });
});


//get DB data of specific category by uri params
//this info will be displayed category/cconcept info
router.get("/:name", function(req, res){
  Category.find({title:req.params.name}, function(error, data){
    res.send(data);
  });
});




// edit concepts within category
//updates specific catery based on category name uri
router.put('/:name', function(req, res){
    //finds specific categy by req.params.name and id
    Category.findOneAndUpdate(
      { "title": req.params.name, "concept._id": req.body._id },
      //sets concept data to edit form data
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


//DELETE CATEGORIES
router.delete('/:name', function(req, res){
  //removes category based on req.params.name uri
  Category.remove({title:req.params.name}, function(err, data){
    res.json(data);
  });
});



//DELETE CONCEPTS
//created route to access a specific concept's id
router.delete("/:name/concepts/:id", function(req, res){
  // now that i have access to req.params.name (category name)
  // and req.params.id(concept id)
  var name = req.params.name
  var id = req.params.id
  //update the category by pulling the concept from the array by id
  Category.update({title: name}, {$pull:{ "concept": {_id: id} }}, function(error, data){
    res.json(data);
  });
});





module.exports = router;