(function() {
  var app = angular.module('FlowLy', ['ngRoute','menu-directive','landing-Directive', 'concept-directive', 'edit-Directive']);

  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true });
    $routeProvider.
        when('/', {
            templateUrl: 'views/pages/home.html',
        }).
        when('/categories/:name', {
            templateUrl: 'views/pages/concepts-page.html',
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

})();
