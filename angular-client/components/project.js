var app = angular.module('meepo2' ) 
// var app = angular.module('meepo2',[])// add new parameter []
app.component('project', {
	templateUrl :'/templates/project.html'
});
app.controller('project' , function ($scope,$http,$window ) {
 
 // use http GET request to fetch all projects from server   
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
 
// use http POST request to send a specific project details that user wanna to add it 
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

// use http POST request to send a specific project details that user wanna to delete it
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
  
// use http POST request to send a specific project details that user wanna to change it
var postChange =function(data) {
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
  
// this function will execute when user press on delete button 
$scope.deleteProject = function(project){
	   	
	get()
	postD(project)
}
  
// this function will execute when user press on update button to save the project 
// detials, to us it in changeProj   
$scope.sendproj = function(project) {
  $scope.proj = project;
  	
}

// this function will execute when user press on save button in fadeout screen 
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

// this function will execute when user press on add button
$scope.addproject = function () {
	post({
		projectName : $scope.projectName , 
		projectDisc : $scope.projectDisc
	});
  	get();
} 

// this function will execute when user press on logout button
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


// Get the elements with class="column"
var elements = document.getElementsByClassName("column");

// Declare a loop variable
var i;

// List View
function listView() {
    for (i = 0; i < elements.length; i++) {
        elements[i].style.width = "100%";
    }
}

// Grid View
function gridView() {
    for (i = 0; i < elements.length; i++) {
        elements[i].style.width = "50%";
    }
}

