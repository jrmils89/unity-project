var app = angular.module("usersController", []);

// usersController is using '$http' for crud requests and '$location' for parsing
// a URL location
app.controller("usersController", ["$http",'$location', function($http,$location){
	var self = this;
	// creating a variable that will store the users as an array (upon request) 
	this.users = [];

	// function that will fire when user (adminApproved) requests a list of all users 
	this.getUsers = function() {
		$http.get('/api/v1/users').then(
			function(response) {
				// when server sends back the data requested, 
				// the list of users will be stored inside 'this(self).users'
				self.users = response.data;
			},
			function(error) {
				// if an error occured during this transmission,
				// the user will be redirected to the root page
				$location.path('/');
			}
		);
	};


// 	if an Admin wants to edit a user's info, they will
// 	click on the edit button for that user and this function will fire
// permitting them to alter user's data 
	this.editUser = function(index, user) {
		// arguments stating that the index position of the user will be the user 
		// who's info the Admin wishes to update
		if (document.getElementById("editUpdateButton"+index).textContent == 'Edit') {
			document.getElementById("editUpdateButton"+index).textContent="Save";
			// var row will contain the specific id of the user who the Admin clicks on
			var row = document.getElementById("user"+index);
			for (var i = 0; i < row.children.length; i++) {
				// searching through that user's info and removing the attribute that
				// restricts the ability to edit user data
				row.children[i].children[0].removeAttribute("disabled");
			};
		} else {
			// argument that gets executed if the Admin is not editing 
			document.getElementById("editUpdateButton"+index).textContent="Edit";
			var row = document.getElementById("user"+index);
			for (var i = 0; i < row.children.length; i++) {
				if (row.children[i].children[0].type != 'button') {
					row.children[i].children[0].setAttribute("disabled", "disabled");
				};
			};

			// after Admin chooses the info that they want to edit for a particular user,
			// the client will send this $http request so the server can process it 
			// and apply the changes to the database
			$http.put('/api/v1/users/'+user._id, user).then(
				function(response) {
					return true;
				},
				function(error) {
					console.log(error);
				}
			);
		};
	};

	this.getUsers();

}]);