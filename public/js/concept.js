var app = angular.module("concept-directive", ['conceptController', 'add-concept']);

  app.directive("conceptDirective", [function(){
  	return{
  		restrict: "E",
  		templateUrl: "views/templates/concept-partial.html",
  		controller: "conceptController",
  		controllerAs: "conceptCtrl"
  	}
  }]);
