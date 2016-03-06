var app = angular.module("conceptController", []);

app.controller("conceptController", ["$http", function($http){
	var self = this;

	$http.get("/categories").then(
		function(response){
			console.log(response.data)
			self.category = response.data
		},
		function(error){
			console.log("error")
		}
	)
}])