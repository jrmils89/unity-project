var app = angular.module("menu-directive", []);

  app.directive("menuDirective", [function(){
  	return{
  		restrict: "E", 
  		templateUrl: "views/templates/menu-partial.html"
  	}
  }])