var app = angular.module('categoryContoller', ['ngCookies']);


app.controller('categoryContoller', ['$http','$location','$cookies', '$scope', function($http,$location,$cookies, $scope) {
  var self = this;

  // This gets a cookie that was set by the server if the user requested a path other than '/'
  // If it finds that cookie and it's not either null or '/favicon' then it will redirect the window
  // to the requested path. The '/favicon' part is a placeholder in there until the application has a favicon...

  var path = $cookies.get('redirectUrlFlowLy');

  if(path != 'null' && path != '/favicon.ico') {
    $cookies.put('redirectUrlFlowLy','null');
    $location.path(path);
  }

  this.categoryNames = null;

  this.show = false;

  this.

  this.revealCategories = function(){
    self.show = !self.show
  };

  // Makes a GET request to the server /categories route
  this.loadData = function() {
      $http.get('/api/v1/categories').then(
      function(response) {
        self.categoryNames = response.data;
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.loadData();

  this.newCategory = {}

  this.addCategory = function(){
    $http({
      method:"POST",
      url: "/api/v1/categories",
      data: this.newCategory
    }).then(
      function(response){
        self.newCategory = {};
        self.loadData();
      },
      function(error){
        console.log(error)
      }
    )
  }




this.deleteCategory = function(index, category){
      console.log(category);

  // self.categoryNames[0].splice(index, 1);
  // if(self.categoryNames != null){
  
// $scope.self.categoryNames.splice($scope.flumps.indexOf($scope.flump), 1);
  $http.delete('/api/v1/categories/' + self.categoryNames._id).then(


    // console.log(data);

    function(response){
      console.log(response);
    }
    )

}






}]);


