var app = angular.module("usersController", []);

app.controller("usersController", ["$http",'$location', function($http,$location){
	var self = this;

	this.users = [];

	this.getUsers = function() {
		$http.get('/api/v1/users').then(
			function(response) {
				self.users = response.data;
			},
			function(error) {
				$location.path('/');
			}
		);
	};

	this.editUser = function(index, user) {
		if (document.getElementById("editUpdateButton"+index).textContent == 'Edit') {
			document.getElementById("editUpdateButton"+index).textContent="Save";
			var row = document.getElementById("user"+index);
			for (var i = 0; i < row.children.length; i++) {
				row.children[i].children[0].removeAttribute("disabled");
			};
		} else {
			document.getElementById("editUpdateButton"+index).textContent="Edit";
			var row = document.getElementById("user"+index);
			for (var i = 0; i < row.children.length; i++) {
				if (row.children[i].children[0].type != 'button') {
					row.children[i].children[0].setAttribute("disabled", "disabled");
				};
			};

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