var app = angular.module("AddConceptController", []);

app.controller("AddConceptController", ["$http", "$routeParams", function($http, $routeParams){
	var self = this;
	this.name = $routeParams.name
	console.log(this.name)
	var newConcept = {};

	this.addConcept = function(){
		console.log("clicking")
		$http({
			method: "POST",
			url: "/categories/" + this.name,
			data:this.newConcept
		}).then(
			function(response){
				console.log(response)
			},
			function(error){
				console.log(error)
			}
		)		
	}
}])