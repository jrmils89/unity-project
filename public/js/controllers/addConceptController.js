var app = angular.module("AddConceptController", ['ngCookies']);

<<<<<<< HEAD
// creating controller for AddConcept
app.controller("AddConceptController", ["$http", "$routeParams",'$scope', function($http, $routeParams,$scope){
	// storing 'this' inside anotehr variable so we can access the controller 
	// within deeper scopes
=======
app.controller("AddConceptController", ["$http", "$routeParams",'$scope','$cookies', function($http, $routeParams,$scope,$cookies){
>>>>>>> 47865544df9a5a79d6e34378367a8d15e81f94ac
	var self = this;
	// this.name is = req.params.name which is recieved from server-side
	this.name = $routeParams.name
	// preparing newConcept as an object that will eventually be returned 
	// with the data of the concept that a user will create
	var newConcept = {};
<<<<<<< HEAD
	// creating the function that will be invoked when a user clicks on the button
	// that says 'add concept'
	this.addConcept = function(){
		// after user clicks 'add concept', ajax will send the $http request that
		// will send out the 'POST' request to the server in order to update the
		// concept schema that is contained within the category that the user
		// wants to add the newConcept to
		$http({
			method: "POST",
			url: "/api/v1/categories/" + this.name,
			data:this.newConcept
		}).then(
			function(response){
				$scope.$emit('new-concept-data-added', response.data);
				self.newConcept = {};
			},
			function(error){
				console.log(error)
			}
		)
	}
=======
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
>>>>>>> 47865544df9a5a79d6e34378367a8d15e81f94ac
}])