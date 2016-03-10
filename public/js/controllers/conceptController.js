var app = angular.module("conceptController", ['ngCookies']);
var ospry = new Ospry('sk-test-az04lqf40ktzhht4iwe311f8');

app.controller("conceptController", ["$http", "$routeParams", "$cookies", "$scope", function($http, $routeParams, $cookies, $scope) {
  var self = this;

  this.name = $routeParams.name;

  this.user = {};
  this.user.loggedIn = false;
  var cookies = $cookies.getAll();

  if (cookies.userUsername && cookies.userEmail) {
    self.user = {
      username: cookies.userUsername,
      email: cookies.userEmail,
      isAdmin: cookies.userIsAdmin,
      loggedIn: true
    };
  };



  $scope.$on('user-logged-in', function(eventObj, data) {
    self.user = data;
  });

  $scope.$on('user-logged-out', function(eventObj, data) {
    self.user = data;
  });

  $scope.$on('user-signed-up', function(eventObj, data) {
    self.user = data;
  });

  $scope.$on('new-concept-data-added', function(eventObj, data) {
    self.getConceptData();
  });

  this.concept = [];

  this.getConceptData = function() {
    $http.get("/api/v1/categories/" + this.name).then(
      function(response) {
        self.concept = response.data
      },
      function(error) {
        console.log(error)
      }
    )
  };

  self.getConceptData();

  this.editConcept = null;
  this.revealConcepts = function(index) {
    if (self.editConcept === index) {
      self.editConcept = null;
    } else {
      self.editConcept = index;
    }
  };


  this.deleteConcept = function(index, concept){
    self.concept[0].concept.splice(index, 1);
    $http.delete("/api/v1/categories/" + self.name + "/concepts/" + concept._id).then(
      function(response){
        return true;
      },
      function(error){
        console.log(error)
      }
    )
  }



  this.saveData = function(data, index) {
    if (document.getElementById("formFile" + index).value != "") {
      ospry.up({
        form: document.getElementById("conceptForm" + index),
        imageReady: function(err, metadata) {
          data.img = metadata.httpsURL;
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