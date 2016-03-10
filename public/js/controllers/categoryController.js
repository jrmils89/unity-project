var app = angular.module('categoryContoller', ['ngCookies']);


app.controller('categoryContoller', ['$http','$location','$cookies', '$scope', function($http,$location,$cookies, $scope) {
  var self = this;

  // ==================================================================================
  // This gets a cookie that was set by the server if the user requested a path other than '/'
  // If it finds that cookie and it's not either null or '/favicon' then it will redirect the window
  // to the requested path. The '/favicon' part is a placeholder in there until the application has a favicon...
  var path = $cookies.get('redirectUrlFlowLy');

  if(path != 'null' && path != '/favicon.ico') {
    $cookies.put('redirectUrlFlowLy','null');
    $location.path(path);
  }
  // ==================================================================================

  // Declaring default values
  this.categoryNames = null;
  this.show = false;
  this.newCategory = {};

  // This is a function to show/hide the categories
  this.revealCategories = function() {
    self.show = !self.show;
  };

  // Makes a GET request to the server /categories route
  this.loadData = function() {
      $http.get('/api/v1/categories').then(
      function(response) {
        // Sets the category names to the response data
        self.categoryNames = response.data;
      },
      function(error) {
        console.log(error); // Logs the error
      }
    );
  };

  // Call the load data function by default, which loads all of our categories
  this.loadData();

  // NEW
  // Makes a POST request to our endpoint to add a category
  this.addCategory = function(){
    $http({
      method:"POST",
      url: "/api/v1/categories",
      data: this.newCategory
    }).then(
      function(response){
        // Clears out the object holding the new category
        // and then reloads all the data on the page
        self.newCategory = {};
        self.loadData();
      },
      function(error){
        console.log(error); // Logs the error
      };
    );
  };
}]);