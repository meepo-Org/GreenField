var app = angular.module('meepo')

app.component('project', {
	templateUrl :'/templates/project.html'
});

app.controller('project' , function ($scope,$http ) {
  
 var get = function () {
    var response = {
		method:"GET",
		url : '/project'
	}
		$http(response).then(function (res) {
			$scope.projects = res.data
			console.log($scope.projects)
		},function () {
			console.log('error')
		})
 }
 ///////////////

 var post = function (data) {
	var requestData = {
		method :'POST',
		url : '/project',
		data : data
	}
	$http(requestData).then(function () {
		console.log('success');
	},function () {
		console.log('error');
	})
 }
  get()
  ////////////////


var postD =function(data) {
	var requestData = {
		method : 'POST',
		url : '/deleteProj',
		data : data 
	}
	$http(requestData).then(function () {
		console.log('success');
	},function () {
		console.log('error');
	})
}
  ///////////////////
  ///////////////////

  var postChange =function(data) {
  	console.log("dataaaaa",data)
	var requestData = {
		method : 'POST',
		url : '/changeProj',
		data : data 
	}
	$http(requestData).then(function () {
		console.log('success');
	},function () {
		console.log('error');
	})
}
  ///////////////////

 $scope.addproject = function () {
 	get()
 	
 	post({
 		projectName  : $scope.projectName,
 		projectDisc : $scope.projectDesc
 		});
  } 

   $scope.deleteProject = function(project){
	   	
	   	get()
	   	postD(project)
   }
  /////////////////
  $scope.sendproj = function(project) {
  	$scope.proj = project;
  	
  }
  ///////////////// 
   $scope.changeProj = function(projectId) {
   		get()
    	postChange({
 		projectName  : $scope.newprojName,
 		projectDisc : $scope.newprojDesc,
 		_id : $scope.proj
 		});

    }
	
});



