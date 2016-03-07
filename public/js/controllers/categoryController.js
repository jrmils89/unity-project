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

  this.newCategory = {}

  this.addCategory = function(){
    console.log("adding category")
    // $http.post("/categories/" + self.name).then(
    //  function(response){
    //    console.log(response)
    //  },
    //  function(error){
    //    console.log(error)
    //  }
    // )
    $http({
      method:"POST",
      url: "/categories",
      data: this.newCategory
    }).then(
      function(response){
        console.log(response.data)
      },
      function(error){
        console.log(error)
      }
    )
  }



}]);


