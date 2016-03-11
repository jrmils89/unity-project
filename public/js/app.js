(function() {
//"FlowLy" app depends all directives, ngRoute and ngCookies
  var app = angular.module('FlowLy', ['ngRoute','menu-directive','landing-Directive', 'concept-directive', 'login-directive', 'signup-directive', 'logout-directive', 'user-directive','draw-directive','ngCookies']);


//sets up angular routing
app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true });
    $routeProvider.
        // when on home page, render home.html page
        when('/', {
          templateUrl: 'views/pages/home.html',
        }).
        // when on a categories name page, render concept-page.html
        when('/categories/:name', {
            templateUrl: 'views/pages/concepts-page.html',
        }).
        //admin can view all users
        // when on /users, render users.html
        when('/users', {
            templateUrl: 'views/pages/users.html',
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

})();


