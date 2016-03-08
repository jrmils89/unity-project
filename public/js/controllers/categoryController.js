var app = angular.module('categoryContoller', []);


app.controller('categoryContoller', ['$http','$location', function($http,$location) {
  var self = this;
  
  var path = document.cookie.replace(/redirectUrlFlowLy=(.*);/, "$1").substring(18).replace(/\%2F*/igm,'/');

  if(path.substring(0,1) == '/') {
    $location.path(path);
  }

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


