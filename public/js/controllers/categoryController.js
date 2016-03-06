var app = angular.module('categoryContoller', []);


app.controller('categoryContoller', ['$http', function($http) {
  var self = this;

  this.categoryNames = null;

  this.show = false;

  this.revealCategories = function(){
    self.show = !self.show
  };

  // Makes a GET request to the server /categories route
  $http.get('/categories').then(
    function(response) {
      self.categoryNames = response.data;
    },
    function(error) {
      console.log(error);
    }
  );

  
  this.saveData = function(id, data) {
    $http.put('/categories/'+id, data).then(
      function(response) {
        console.log("CONTENT UPDATED")
      },
      function(error) {
        console.log(error);
      }
    );
  };



}]);


// app.controller("FormController", ['$scope', '$http', function($scope, $http) {
//   var self = this;

//   if(this.)

// }]);