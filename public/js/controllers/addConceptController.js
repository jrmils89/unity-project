var app = angular.module("AddConceptController", ['ngCookies']);

app.controller("AddConceptController", ["$http", "$routeParams",'$scope','$cookies', function($http, $routeParams,$scope,$cookies){
	var self = this;
	this.name = $routeParams.name
	var newConcept = {};
	this.drawDivShow = false;

	this.showDraw = function() {
		self.drawDivShow = !self.drawDivShow;
	};

	this.user = {};
	this.user.loggedIn = false;

	var cookies = $cookies.getAll();

	if (cookies.userUsername && cookies.userEmail) {
		self.user = {
			username: cookies.userUsername,
			email: cookies.userEmail,
			password: cookies.userPassword,
			isAdmin: cookies.userIsAdmin,
			loggedIn: true
		};
	};

	this.addConcept = function(data) {
	  if (document.getElementById("addConceptImage").value != "") {
	    ospry.up({
	      form: document.getElementById("addConceptForm"),
	      imageReady: function(err, metadata) {
	        data.img = metadata.httpsURL;
	        $http({
	          method: "POST",
	          url: "/api/v1/categories/" + self.name,
	          data: data
	        }).then(
	          function(response) {
	            $scope.$emit('new-concept-data-added', response.data);
	            self.newConcept = {};
	          },
	          function(error) {
	            console.log(error);
	          }
	        );
	      },
	    });
	  } else {
	    $http({
	      method: "POST",
	      url: "/api/v1/categories/" + this.name,
	      data: data
	    }).then(
	      function(response) {
	        $scope.$emit('new-concept-data-added', response.data);
	        self.newConcept = {};
	      },
	      function(error) {
	        console.log(error);
	      }
	    );
	  }
	};


	$scope.$on('user-logged-in', function(eventObj, data) {
		self.user = data;
	});

	$scope.$on("user-logged-out", function(eventObj, data){
		self.user = {};
		self.user.loggedIn = false;
		self.viewForm = false;
	});

	$scope.$on('user-signed-up', function(eventObj, data) {
		self.user = data;
	});
}])