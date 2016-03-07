var app = angular.module("conceptController", ['ngCookies']);

app.controller("conceptController", ["$http", "$routeParams", "$cookies",'$scope', function($http, $routeParams, $cookies,$scope){
	var self = this;

	this.name = $routeParams.name;
	// console.log($routeParams.name)

	$scope.$on('user-logged-in', function(eventObj, data){
        self.user = data;
    });

	$scope.$on('user-logged-out', function(eventObj, data){
	        self.user = data;
    });

	this.concepName = 'Controller'

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