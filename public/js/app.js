(function() {
  var app = angular.module('FlowLy', ['ngRoute','menu-directive','landing-Directive', 'concept-directive', 'login-directive', 'signup-directive','draw-directive','ngCookies']);


app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true });
    $routeProvider.
        when('/', {
              templateUrl: 'views/pages/home.html',
        }).
        when('/categories/:name', {
            templateUrl: 'views/pages/concepts-page.html',
        }).
        when('/draw', {
            templateUrl: 'views/pages/draw.html',
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

})();


