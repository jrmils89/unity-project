var app = angular.module("menu-directive", ['categoryContoller']);

  app.directive("menuDirective", [function(){
  	return{
  		restrict: "E",
  		templateUrl: "views/templates/menu-partial.html",
      controller: 'categoryContoller',
      controllerAs: 'categoryCtrl'
  	}
  }]);