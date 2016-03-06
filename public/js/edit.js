var app = angular.module('edit-Directive', ['categoryContoller']);

app.directive('editDirective', [function(){

	return {

		restrict: 'E',
		templateUrl: 'views/templates/edit-concept-partial.html',
		controller: 'categoryContoller',
		controllerAs: 'categoryCtrl'
	}

}]);