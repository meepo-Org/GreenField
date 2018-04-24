var app = angular.module('meepo');

app.component('tasks', {
	template: ` <div class="container" ng-controller="tasksCtrl">
					<h1>ProjectName Tasks:</h1>
				    <table  class="table table-striped">
				    	<thead>
					    	<tr>
					    		<th>Task Description</th>
					    		<th>Assgined To</th>
					    		<th>Task Complexity</th>
					    		<th>Status</th>
					    		<th>Delete</th>
					    	</tr>
				    	<thead>
				    	<tbody>
					    	<tr ng-repeat='task in tasksInfo'>
								<td>{{task.description}}</td>
								<td>{{task.assignedTo}}</td>
								<td>{{task.complexity}}</td>
								<td>{{task.status}}</td>
								<td><button type="button" class="btn btn-danger active" ng-click="deleteTask(task.description)">Delete</button></td>
							
							</tr>
						</tbody>
				    </table>

				    <h4>Add New Task Details</h4>
				    <div class="form-group row">
					    <input type="text" class="form-control" ng-model="description" placeholder="task description"><br>
					    <div class="form-group">
					      <select class="form-control" ng-model="assignedTo">
					        <option>AbdulHameed</option>
					        <option>Abdullateef</option>
					        <option>Qays</option>
					        <option>Shatha</option>
					      </select>
    					</div><br>
					    <input type="text" class="form-control" ng-model="complexity" placeholder="task complexity"><br>
					    <input type="text" class="form-control" ng-model="status" placeholder="task status"><br>
				    </div>
					<button type="button" class="btn btn-primary active" ng-click="addNewTask()">Add New Task</button>
			    </div>`
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
});
