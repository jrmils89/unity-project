var app = angular.module("LogoutController", ["ngCookies"]);

app.controller("LogoutController", ["$http", "$cookies", "$scope", function($http, $cookies, $scope){
	var self = this;
	this.user = {}
	this.user.loggedIn = false;

	var cookies = $cookies.getAll();

	if (cookies.userUsername && cookies.userEmail && cookies.userPassword) {
		self.user = {
			username: cookies.userUsername,
			email: cookies.userEmail,
			password: cookies.userPassword,
			isAdmin: cookies.userIsAdmin,
			loggedIn: true
		};
	};

	this.logout = function() {
	    $http.get('/api/v1/users/logout').then(
	      function(response) {
	        self.user = {};
	        self.user.loggedIn = false;
	        $scope.$emit('user-logged-out', self.user);
	        self.viewForm = false;
	      },
	      function(error) {
	        console.log(error);
	      }
	    );
  	};
}])