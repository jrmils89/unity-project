var app = angular.module("concept-directive", []);

  app.directive("conceptDirective", [function(){
  	return{
  		restrict: "E",
  		templateUrl: "views/templates/concept-partial.html"
  	}
  }]);