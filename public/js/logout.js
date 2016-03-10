var app = angular.module("logout-directive", ["LogoutController"]);

app.directive("logoutDirective", [function(){
	return{
		restrict: "E",
		templateUrl: "views/templates/logout-partial.html",
		controller: "LogoutController",
		controllerAs: "logoutCtrl"
	}
}])