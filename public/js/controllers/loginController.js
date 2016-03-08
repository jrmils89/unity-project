var app = angular.module('loginController', ['ngCookies']);


app.controller('loginController', ['$http','$cookies','$scope', function($http,$cookies,$scope) {
  var self = this;
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



  this.revealLogin = function(){
    self.show = !self.show;
  }


  $scope.$on('user-signed-up', function(eventObj, data){
        self.user = data;
    });


  this.login = function(data) {
      $http.post('/api/v1/users/login', data).then(
      function(response) {
        var cookies = $cookies.getAll();
        self.user = {
          username: cookies.userUsername,
          email: cookies.userEmail,
          isAdmin: cookies.userIsAdmin
        };
        if (cookies.userUsername != null) {self.user.loggedIn = true};
        $scope.$emit('user-logged-in', self.user);
      },
      function(error) {
        console.log(error);
      }
    );
  }

  this.logout = function() {
    $http.get('/api/v1/users/logout').then(
      function(response) {
        self.user = {};
        self.user.loggedIn = false;
        $scope.$emit('user-logged-out', self.user);
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.viewForm = false

  this.showForm = function(){
    self.viewForm = !self.viewForm
  }

}]);
