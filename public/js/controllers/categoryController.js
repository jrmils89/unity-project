var app = angular.module('categoryContoller', []);


app.controller('categoryContoller', ['$http', function($http) {
  var self = this;

  this.categoryNames = null;

  $http.get('/categories').then(
    function(response) {
      self.categoryNames = response.data;
    },
    function(error) {
      console.log(error);
    }
  );

}])
