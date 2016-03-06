var app = angular.module("conceptController", []);

app.controller("conceptController", ["$http", "$routeParams", function($http, $routeParams){
	var self = this;

	this.name = $routeParams.name;
	// console.log($routeParams.name)

	this.concept = [];

	$http.get("/categories/" + this.name).then(
		function(response){
			// console.log(response.data)
			self.concept = response.data
		},
		function(error){
			console.log("error")
		}
	)
}]);