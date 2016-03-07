var app = angular.module("conceptController", ['ngCookies']);

app.controller("conceptController", ["$http", "$routeParams", "$cookies",'$scope', function($http, $routeParams, $cookies,$scope){
	var self = this;

	this.name = $routeParams.name;

	this.user = {};
  this.user.loggedIn = false;
	var cookies = $cookies.getAll();

	if (cookies.userUsername && cookies.userEmail) {
		self.user = {
			username: cookies.userUsername,
			email: cookies.userEmail,
			isAdmin: cookies.userIsAdmin,
			loggedIn: true
		};
	};

	$scope.$on('user-logged-in', function(eventObj, data){
        self.user = data;
    });

	$scope.$on('user-logged-out', function(eventObj, data){
	        self.user = data;
    });


	this.concepName = 'Controller'

	this.concept = [];




	$http.get("/categories/" + this.name).then(
		function(response){
			// console.log(response.data)
			self.concept = response.data
		},
		function(error){
			console.log("error")
		}
	)




	this.edit = false;

    this.revealConcepts = function(){
    	self.edit = !self.edit
  	};

  



  this.saveData = function(data) {
    $http.put('/categories/'+ self.name, data).then(
      function(response) {

      },
      function(error) {
        console.log(error);
      }
    );
  };




}]);
	// close controller






