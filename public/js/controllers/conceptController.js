var app = angular.module("conceptController", []);

app.controller("conceptController", ["$http", "$routeParams", function($http, $routeParams){
	var self = this;

	this.name = $routeParams.name;

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






