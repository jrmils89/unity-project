// Setup our module requiring controller and ngCookies
var app = angular.module("SignupController", ['ngCookies']);

// Defining our controller functionationlity
app.controller("SignupController", ["$http", "$scope", '$cookies', function($http, $scope, $cookies){

	// Declaring our objects
	var self = this;
	this.user = {};
	this.user.loggedIn = false;
	this.viewForm = false;

	// Get all the local cookies
	var cookies = $cookies.getAll();

	// Determine if the user has the cookies that would signal he/she is signed in
	// and if so create the user object with his/her user information
	if (cookies.userUsername && cookies.userEmail && cookies.userPassword) {
		self.user = {
			username: cookies.userUsername,
			email: cookies.userEmail,
			password: cookies.userPassword,
			isAdmin: cookies.userIsAdmin,
			loggedIn: true
		};
	};

	// Signup Function, taking in a user object as a parament
	this.signup = function(data){
		// Post to our signup endpoint passing the data in
		$http.post("/api/v1/users/signup", data).then(
			function(response){
				// The signup endpoint will set cookies in our browser with the user information
				// We are getting this cookie information to set the user object that is passed between
				// our controllers to determine when the user is logged in
				var cookies = $cookies.getAll();
				self.user = {
					username: cookies.userUsername,
					email: cookies.userEmail,
					isAdmin: cookies.userIsAdmin
				};
				if (cookies.userUsername != null) {self.user.loggedIn = true};
				// Once it sets all the user information, it emits a message to $scope
				// that the the user is logged in and passes that user object around
				$scope.$emit("user-signed-up", self.user);
			},
			function(error){
				console.log(error); // Logs the error
			};
		);
	};

	// Listens for a logged in message and sets the logged in data to the data it
	// receives from the login controller
	$scope.$on('user-logged-in', function(eventObj, data) {
	    self.user = data;
  });

	// Listens for a log out message. This functaionatliy intentionally
	// does not set the user to the data it receives. This is because $scope objects
	// are references to data as opposed to actually changing the data in the current scope
	// There is more information about some ways that this coule be handled here:
	// http://stackoverflow.com/questions/29760149/angular-updating-a-scope-object-by-reference-problems
	// Since the objects we need to update are already declared in this scope, we just decided to set
	// them to what we want as opposed to making a copy
	$scope.$on("user-logged-out", function(eventObj, data){
    self.user = {};
		self.user.loggedIn = false;
		self.viewForm = false;
	});

	// This is a click function to show or hide the signup form
	this.showForm = function(index){
		self.viewForm = !self.viewForm;
	};

}]);