var app = angular.module("SignupController", ['ngCookies']);

app.controller("SignupController", ["$http", "$scope", '$cookies', function($http, $scope, $cookies){
	var self = this;
	this.user = {};
	// this.user.signedUp = false;
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

	this.signup = function(data){
		$http.post("/api/v1/users/signup", data).then(
			function(response){
				var cookies = $cookies.getAll();
				self.user = {
					username: cookies.userUsername,
					email: cookies.userEmail,
					isAdmin: cookies.userIsAdmin
				};
				if (cookies.userUsername != null) {self.user.loggedIn = true};
				$scope.$emit("user-signed-up", self.user);
			},
			function(error){
				console.log(error)
			}
		)
	}
}])

















