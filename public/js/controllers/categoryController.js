var app = angular.module('categoryContoller', []);


app.controller('categoryContoller', ['$http','$location', function($http,$location) {
  var self = this;

  this.categoryNames = null;

  this.show = false;

  this.revealCategories = function(){
    self.show = !self.show
  };

  // Makes a GET request to the server /categories route
  $http.get('/api/v1/categories').then(
    function(response) {
      self.categoryNames = response.data;
    },
    function(error) {
      console.log(error);
    }
  );




}]);


