var app = angular.module('categoryContoller', []);


app.controller('categoryContoller', ['$http', function($http) {
  var self = this;

  this.categoryNames = null;

  this.show = false;

  this.revealCategories = function(){
    console.log("revealing categories")
    self.show = !self.show
  };

  $http.get('/categories').then(
    function(response) {
      self.categoryNames = response.data;
      // console.log(response.data)
    },
    function(error) {
      console.log(error);
    }
  );

}])
