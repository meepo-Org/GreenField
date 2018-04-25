var app = angular.module('meepo');

app.component('tasks', {
	templateUrl: '/templates/tasks.html'
});

app.controller('tasksCtrl', function ($scope, $http){

	var get = function () {
		var response = {
			method: "GET",
			url: '/tasks'
		};
		$http(response).then(function (data){
			$scope.tasksInfo = data.data
		},function(){
			console.log('error')
		});
    };
    get();

    var post = function (data) {
		var requestData = {
			method: 'POST',
			url: '/tasks',
			data: data
		};
		$http(requestData).then(function () {
			console.log('success')
		},function () {
			console.log('error')
		});	
 	}

 	$scope.addNewTask = function()
 	{
 		var newTask = {
 			description: $scope.description,
 			assignedTo: $scope.assignedTo,
 			complexity: $scope.complexity,
 			status: $scope.status
 		};

 		post(newTask);
 	}

 	$scope.deleteTask = function(data)
 	{
 		var obj = {
 			method: 'POST',
			url: '/deleteTask',
			data: {description: data}
 		};

 		$http(obj).then(function () {
			console.log('success')
		},function () {
			console.log('error')
		});	
 	}


 	$scope.getOldTaskData = function(oldTask)
 	{
 		$scope.oldTask = oldTask;
 		$scope.oldData = Object.assign({}, oldTask);
 	}

 	$scope.saveChanges = function(data) {

 		var updattedTask = {
 			newData: {
 				description: $scope.oldTask.description,
	 			assignedTo: $scope.oldTask.assignedTo,
	 			complexity: $scope.oldTask.complexity,
	 			status: $scope.oldTask.status
 			},
 			oldData: $scope.oldData
 		};

 		var obj = {
 			method: 'POST',
			url: '/updateTask',
			data:  updattedTask
 		};

 		$http(obj).then(function () {
			console.log('success')
		},function () {
			console.log('error')
		});	
 	}
});
