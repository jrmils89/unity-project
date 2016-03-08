var app = angular.module("add-concept", ["AddConceptController"])

app.directive("addConcept", [function(){
	return{
		restrict: "E",
		templateUrl: "views/templates/addConcept-partial.html",
		controller: "AddConceptController",
		controllerAs: "addConceptCtrl"
	}
}])