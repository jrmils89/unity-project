var app = angular.module("login-directive", ['loginController']);

  app.directive("loginDirective", [function(){
  	return{
  		restrict: "E",
  		templateUrl: "views/templates/login-partial.html",
	    controller: 'loginController',
	    controllerAs: 'loginCtrl'
  	}
  }]);