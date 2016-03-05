var app = angular.module('landing-Directive', ['categoryContoller']);

app.directive('landingDirective', function(){

	return {

		restrict: 'E',
		templateUrl: 'views/templates/landing-partial.html',
		controller: 'categoryContoller',
		controllerAs: 'categoryCtrl'
	}

});