var app = angular.module("conceptController", []);

app.controller("conceptController", ["$http", "$routeParams", function($http, $routeParams){
	var self = this;

	this.name = $routeParams.name;


	this.concept = [];
	this.conceptid = 

	// this.conceptid = [];
	
	// don't think this is working for some reason
	// this.conceptid = $routeParams.conceptid;
	// console.log('rwfwrfwVSVRSV', + this.conceptid);


	$http.get("/categories/" + this.name).then(
		function(response){
			// console.log(response.data)
			self.concept = response.data
			console.log(self.concept);
		},
		function(error){
			console.log("error")
		}
	)



	this.edit = false;

    this.revealConcepts = function(){
    self.edit = !self.edit
  };
// do I need to put this inside it's own form controller because it will
// have to write an ng-if argument that will conflict with the controller that it is currently in.
// would that still make the concept controller the parent controler???


    // $http.get('/categories/' + this.name + '/' + this.conceptid).then(
    //   function(response) {
    //   	self.conceptid = response.data;
    //   	// self.concept = response.data

    //   	console.log("================================================================");
    //     console.log(self.concept);
    //     console.log("================================================================");
    //   },function(error) {
    //     console.log(error);
    //   }
    // );



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






// app.controller("formController", ["$http", "$routeParams", function($http, $routeParams){
	

// }]);




