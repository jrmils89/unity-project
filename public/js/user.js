var app = angular.module("user-directive", ["usersController"]);

app.directive("userDirective", [function(){
	return{
		restrict: "E",
		templateUrl: "views/templates/user-partial.html",
		controller: "usersController",
		controllerAs: "usersCtrl"
	}
}])