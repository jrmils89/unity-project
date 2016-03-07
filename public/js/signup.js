var app = angular.module("signup-directive", ["SignupController"]);

app.directive("signupDirective", [function(){
	return{
		restrict: "E",
		templateUrl: "views/templates/signup-partial.html",
		controller: "SignupController",
		controllerAs: "signupCtrl"
	}
}])