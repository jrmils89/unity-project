(function() {
  var app = angular.module('FlowLy', ['ngRoute','menu-directive','landing-Directive', 'concept-directive']);
  //
  //
  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true }); // tell angular to use push state
    $routeProvider.
        when('/', { //when http://localhost:3000/url1
            templateUrl: 'views/templates/menu-partial.html', // render http://localhost:3000/partials/partial1.html
            controller: 'categoryContoller', // attach controller Ctrl1
            controllerAs: 'categoryCtrl' // alias for Ctrl1 (like ng-controller="Ctrl1 as ctrl")
        }).
        when('/categories/:name', { //when http://localhost:3000/url1
            templateUrl: 'views/templates/concept-partial.html', // render http://localhost:3000/partials/partial1.html
            controller: 'categoryContoller', // attach controller Ctrl1
            controllerAs: 'categoryCtrl' // alias for Ctrl1 (like ng-controller="Ctrl1 as ctrl")
        }).
        otherwise({ // if browser url doesn't match any of the above...
            //here you can do something like above if you'd like with a template and a controller
            redirectTo: '/' // or you can redirect to another url.
            //redirection can happen in any 'when' action; I just happened to do it here. I could have put it in one of the above sections too
        });
    }]);



})()
