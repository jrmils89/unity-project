var app = angular.module("AddConceptController", []);

// creating controller for AddConcept
app.controller("AddConceptController", ["$http", "$routeParams",'$scope', function($http, $routeParams,$scope){
	// storing 'this' inside anotehr variable so we can access the controller 
	// within deeper scopes
	var self = this;
	// this.name is = req.params.name which is recieved from server-side
	this.name = $routeParams.name
	// preparing newConcept as an object that will eventually be returned 
	// with the data of the concept that a user will create
	var newConcept = {};
	// creating the function that will be invoked when a user clicks on the button
	// that says 'add concept'
	this.addConcept = function(){
		// after user clicks 'add concept', ajax will send the $http request that
		// will send out the 'POST' request to the server in order to update the
		// concept schema that is contained within the category that the user
		// wants to add the newConcept to
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