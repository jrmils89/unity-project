var app = angular.module("AddConceptController", []);

app.controller("AddConceptController", ["$http", "$routeParams",'$scope', function($http, $routeParams,$scope){
	var self = this;
	this.name = $routeParams.name
	var newConcept = {};

	this.addConcept = function(){
		$http({
			method: "POST",
			url: "/api/v1/categories/" + this.name,
			data:this.newConcept
		}).then(
			function(response){
				$scope.$emit('new-concept-data-added', response.data);
				self.newConcept = {};
			},
			function(error){
				console.log(error)
			}
		)
	}
}])