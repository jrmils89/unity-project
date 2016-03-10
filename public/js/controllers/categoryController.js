var app = angular.module('categoryContoller', ['ngCookies']);


app.controller('categoryContoller', ['$http', '$location', '$cookies', '$scope', function($http, $location, $cookies, $scope) {
  var self = this;

  // This gets a cookie that was set by the server if the user requested a path other than '/'
  // If it finds that cookie and it's not either null or '/favicon' then it will redirect the window
  // to the requested path. The '/favicon' part is a placeholder in there until the application has a favicon...

  var path = $cookies.get('redirectUrlFlowLy');

  if (path != 'null' && path != '/favicon.ico') {
    $cookies.put('redirectUrlFlowLy', 'null');
    $location.path(path);
  }

  this.categoryNames = null;

  this.show = false;

  // to check if current user is logged in & isAdmin so they are able to update
  // categories
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


  this.revealCategories = function() {
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

  this.addCategory = function() {
    $http({
      method: "POST",
      url: "/api/v1/categories",
      data: this.newCategory
    }).then(
      function(response) {
        self.newCategory = {};
        self.loadData();
      },
      function(error) {
        console.log(error)
      }
    )
  }

  this.deleteCategory = function(title) {
    $http.delete('/api/v1/categories/' + title.title).then(
      function(response) {
        self.loadData();
      },
      function(error) {
        console.log(error);
      };
    );
  };

}]);