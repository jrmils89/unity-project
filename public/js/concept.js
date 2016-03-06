var app = angular.module("concept-directive", ['categoryContoller']);

  app.directive("conceptDirective", [function(){
  	return{
  		restrict: "E",
  		templateUrl: "views/templates/concept-partial.html",

  		// masha's doing this
  		controller: 'categoryContoller',
		controllerAs: 'categoryCtrl'
  	}
  }]);