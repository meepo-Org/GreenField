var app = angular.module('meepo');

app.component('taskDetails', {	
	bindings: {
		task: '<'
	},

	template: `  <td>{{$ctrl.task.description}}</td>
				 <td>{{$ctrl.task.assignedTo}}</td>
				 <td>{{$ctrl.task.complexity}}</td>
				 <td>{{$ctrl.task.status}}</td>`
});

app.controller('taskDetailsCtrl', function($scope, $http){

});
