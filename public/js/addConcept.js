var app = angular.module("add-concept", [])

app.directive("addConcept", [function(){
	return{
		restrict: "E",
		templateUrl: "views/templates/addConcept-partial.html"
	}
}])