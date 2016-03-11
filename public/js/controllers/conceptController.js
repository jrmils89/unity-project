var app = angular.module("conceptController", ['ngCookies']);


var ospry = new Ospry('sk-test-az04lqf40ktzhht4iwe311f8');

app.controller("conceptController", ["$http", "$routeParams", "$cookies", "$scope", function($http, $routeParams, $cookies, $scope) {
  //making this a global variable
  var self = this;

  //$routeParams.name = the name of the page that we are currently on based on URI
  this.name = $routeParams.name;

  //user is an empty object
  this.user = {};
  //whose logged in status is initially set to false
  //not logged in user is unable to add concepts or make custom flow chart
  this.user.loggedIn = false;

  //acquiring cookies to set user data
  var cookies = $cookies.getAll();

  //once a user has signup/logged in this means they have username and email data as object values
  //if this info is present, set user object data to cookie data
  //cookie data retrieved from server
  if (cookies.userUsername && cookies.userEmail) {
    self.user = {
      username: cookies.userUsername,
      email: cookies.userEmail,
      isAdmin: cookies.userIsAdmin,
      loggedIn: true
    };
  };


  // it is necessary for the concept controller to listen for $emit call when user:
  //    logs in, logs out, and signs up
  $scope.$on('user-logged-in', function(eventObj, data) {
    //set $emitted data to be user object values
    self.user = data;
  });

  $scope.$on('user-logged-out', function(eventObj, data) {
    self.user = data;
  });


  $scope.$on('user-signed-up', function(eventObj, data) {
    self.user = data;
  });

  //concept controller must listen for $emit after a logged in user adds a new concept
  $scope.$on('new-concept-data-added', function(eventObj, data) {
    //perform getConceptData function
    //make get request for a concept to = json data that is saved after being created
    self.getConceptData();
  });

  //concept is an empty array until created from ng-model
  this.concept = [];

  // ng-click function to make an ajax request to specific category page
  this.getConceptData = function() {
    $http.get("/api/v1/categories/" + this.name).then(
      function(response) {
        // concept item is data from db
        self.concept = response.data
      },
      function(error) {
        console.log(error)
      }
    )
  };

  //get concept data to populate concept page
  self.getConceptData();


  this.editConcept = null;
  //index parameter to edit clicked concept
  //shows edit concept form
  this.revealConcepts = function(index) {
    if (self.editConcept === index) {
      self.editConcept = null;
    } else {
      self.editConcept = index;
    }
  };

  //delete individual concept 
  this.deleteConcept = function(index, concept){
    //extract specific concept from category.concept array
    self.concept[0].concept.splice(index, 1);
    //ajax delete request
    $http.delete("/api/v1/categories/" + self.name + "/concepts/" + concept._id).then(
      function(response){
        return true;
      },
      function(error){
        console.log(error)
      }
    )
  }

  //add star ratings which determines order of concept view
  this.addStars = function(data) {
    //inccrement by one
    data.stars += 1;
    //update category/:name data
    $http.put('/api/v1/categories/' + self.name, data).then(
      function(response) {
        return true;
      },
      function(error) {
        console.log(error);
      }
    );
  };

  //when form is submit, save edited data
  this.saveData = function(data, index) {
    //if there is a input#formFile{{$index}} value
    //if there is an image uploaded
    if (document.getElementById("formFile" + index).value != "") {
      //ospry function .up uploads image files to Ospry for storage
      ospry.up({
        //form: DOM element
        form: document.getElementById("conceptForm" + index),
        // function parameters called when image upload attempt is complete
        imageReady: function(err, metadata) {
          // img = metdata argument object
          // httpsURL:    // {string}  Download URL if your site is served over HTTPS
          data.img = metadata.httpsURL;
          //update model to include img url string
          $http.put('/api/v1/categories/' + self.name, data).then(
            function(response) {
              return true;
            },
            function(error) {
              console.log(error);
            }
          );
        },
      });
    } else {
      $http.put('/api/v1/categories/' + self.name, data).then(
        function(response) {
          return true;
        },
        function(error) {
          console.log(error);
        }
      );
    }
  };




}]);
// close controller