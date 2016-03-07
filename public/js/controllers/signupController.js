var app = angular.module("SignupController", ['ngCookies']);

app.controller("SignupController", ["$http",'$cookies', function($http, $cookies){
	var self = this;
	this.user = {};
	this.user.signedUp = false;

	var cookies = $cookies.getAll();

	if (cookies.userUsername && cookies.userEmail) {
	    self.user = {
	      username: cookies.userUsername,
	      email: cookies.userEmail,
	      signedUp: true
	    };
  	};

	this.signup = function(data){
		$http.post("/users/signup", data).then(
			function(response){
				var cookies = $cookies.getAll();
				self.user = {
					username: cookies.userUsername,
					email: cookies.userEmail
				};
				if (cookies.userUsername != null) {self.user.loggedIn = true};
				console.log(response)
			},
			function(error){
				console.log(error)
			}
		)
	}
}])