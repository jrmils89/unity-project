var app = angular.module('edit-Directive', ['conceptController']);

app.directive('editDirective', [function(){

	return {

		restrict: 'E',
		templateUrl: 'views/templates/edit-concept-partial.html',
		controller: 'conceptController',
		controllerAs: 'conceptCtrl'
	}

}]);