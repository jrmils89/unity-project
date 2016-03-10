var app = angular.module("draw-directive", ['drawController']);

  app.directive("drawDirective", [function(){
  	return{
  		restrict: "E",
  		templateUrl: "views/templates/draw-partial.html",
  		controller: "drawController",
  		controllerAs: "drawCtrl"
  	}
  }]);
