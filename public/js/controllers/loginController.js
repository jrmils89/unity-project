var app = angular.module('loginController', ['ngCookies']);


app.controller('loginController', ['$http','$cookies', function($http,$cookies) {
  var self = this;
  this.user = {};
  this.user.loggedIn = false;

  var cookies = $cookies.getAll();

  if (cookies.userUsername && cookies.userEmail) {
    self.user = {
      username: cookies.userUsername,
      email: cookies.userEmail,
      loggedIn: true
    };
  };

  this.login = function(data) {
      $http.post('/users/login', data).then(
      function(response) {
        var cookies = $cookies.getAll();
        self.user = {
          username: cookies.userUsername,
          email: cookies.userEmail,
        };
        if (cookies.userUsername != null) {self.user.loggedIn = true};
      },
      function(error) {
        console.log(error);
      }
    );
  }

  this.logout = function() {
    $http.get('/users/logout').then(
      function(response) {
        self.user = {};
        self.user.loggedIn = false;
      },
      function(error) {
        console.log(error);
      }
    );
  };

}]);
