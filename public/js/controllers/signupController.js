var app = angular.module("SignupController", ['ngCookies']);

app.controller("SignupController", ["$http", "$scope", '$cookies', function($http, $scope, $cookies){
	var self = this;
	this.user = {};
	// this.user.signedUp = false;
	this.user.loggedIn = false;

	// $scope.$on('user-logged-in', function(eventObj, data){
 //        self.user = data;
 //    });

	// $scope.$on('user-logged-out', function(eventObj, data){
	//         self.user = data;
 //    });    


	this.signup = function(){

		console.log("submitting");

		$http.post("/users/signup").then(
			function(response){
				self.user.loggedIn = true
				console.log(self.user)
			},
			function(error){
				console.log(error)
			}
		)
	}
}])