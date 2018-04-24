var app = angular.module('meepo2')
app.component('project', {
	templateUrl :'/templates/project.html'
});
app.controller('project' , function ($scope,$http,$window) {
	var get = function () {
		var response = {
			method:"GET",
			url : '/project'
		}
		$http(response).then(function (data) {
			$scope.getter = data['data'];
		},function () {
			console.log('error')
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
		});
	}
	$scope.addproject = function () {
		post({
			projectName : $scope.projectName , 
			projectDisc : $scope.projectDisc
		});
	} 
	$scope.test = function () {
		$window.location.href = 'index.html';
		
	}
	$scope.logout = function () {
		$window.location.href = 'index.html';
		logout()
	}
});