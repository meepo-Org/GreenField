var app = angular.module('meepo2' )
// var app = angular.module('meepo2',[])// add new parameter []
app.component('project', {
	templateUrl :'/templates/project.html'
});
app.controller('project' , function ($scope,$http,$window ) {
  
 var get = function () {
    var response = {
		method:"GET",
		url : '/project'
	}
		$http(response).then(function (res) {
			$scope.projects = res.data
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
  ////////////////
var postProjectId = function (projectId) {
	var requestData = {
		method :'POST',
		url : '/projectId',
		data : projectId
	}
	$http(requestData).then(function () {
		console.log('success');
	},function () {
		console.log('error');
	})
 }

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

	var logout = function () {
		var response={
			method:"GET",
			url : '/logout'
		}
		$http(response).then(function (data) {
		},function () {
			console.log('error')
		});
	}
	$scope.addproject = function () {
		post({
			projectName : $scope.projectName , 
			projectDisc : $scope.projectDisc
		});
  		get();
	} 

	$scope.logout = function () {
		$window.location.href = 'index.html';
		logout()
	}
	$scope.addTask = function (projectId) {
		postProjectId({projectId:projectId})
		$window.location.href = 'app3.html'
	}
  get()

});

