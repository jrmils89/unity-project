var app = angular.module("concept-directive", ['conceptController']);

  app.directive("conceptDirective", [function(){
  	return{
  		restrict: "E",
  		templateUrl: "views/templates/concept-partial.html",
  		controller: "conceptController",
  		controllerAs: "conceptCtrl"
  	}
  }]);
