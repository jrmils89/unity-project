var app = angular.module('loginController', ['ngCookies']);


app.controller('loginController', ['$http','$cookies','$scope', function($http,$cookies,$scope) {
  var self = this;
  //user is an empty object until logged in
  this.user = {};
  //user loggedIn status is false until user created
  this.user.loggedIn = false;

  //acquiring cookies to set user data
  var cookies = $cookies.getAll();

  //once a user has signup/logged in this means they have username and email data as object values
  //if this info is present, set user object data to cookie data
  //cookie data retrieved from server
  if (cookies.userUsername && cookies.userEmail) {
    self.user = {
      username: cookies.userUsername,
      email: cookies.userEmail,
      isAdmin: cookies.userIsAdmin,
      loggedIn: true
    };
  };

  //on click toggle login form
  this.revealLogin = function(){
    self.show = !self.show;
  }

  //listen to signed up emission
  // in cases if user signd up we want to access login views since user is "logged in" once signed up
  $scope.$on('user-signed-up', function(eventObj, data) {
    self.user = data;
  });

  //listen to logged out emissions
  //hides logout form if a user is not signed up/logged in
  $scope.$on("user-logged-out", function(eventObj, data){
    self.user = {};
    //make loggedIn false to hide or display functionality
    //hides ability to log out if user is signed in
    self.user.loggedIn = false;
  });

  //when login form is submit
  this.login = function(data) {
      //make ajax request 
      $http.post('/api/v1/users/login', data).then(
      function(response) {
        //retrive cookie data
        var cookies = $cookies.getAll();
        // user = previously established cookie data
        self.user = {
          username: cookies.userUsername,
          email: cookies.userEmail,
          isAdmin: cookies.userIsAdmin
        };
        //if there is a username, user logged in thus we want to hide re-abaility to log in unless logged out
        if (cookies.userUsername != null) {self.user.loggedIn = true};
        //emit message for controllers to listen that we have logged in
        $scope.$emit('user-logged-in', self.user);
        //hide form after logged in. otherwise maintains true boolean value for it to be shown
        self.viewForm = false;
      },
      function(error) {
        console.log(error);
      }
    );
  }

  // this.logout = function() {
  //   $http.get('/api/v1/users/logout').then(
  //     function(response) {
  //       self.user = {};
  //       self.user.loggedIn = false;
  //       $scope.$emit('user-logged-out', self.user);
  //       self.viewForm = false;
  //     },
  //     function(error) {
  //       console.log(error);
  //     }
  //   );
  // };

  // false so it is hidden until true
  this.viewForm = false;

  // toggle form visibilty onclick
  this.showForm = function(index){
    self.viewForm = !self.viewForm
  }



}]);
