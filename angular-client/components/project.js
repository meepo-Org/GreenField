var app = angular.module('meepo')

app.component('project', {
	templateUrl :'/templates/project.html'
});

app.controller('project' , function ($scope,$http ) {
	var get = function () {
	var get={
		method:"GET",
		url : '/project'
	}
		$http(get).then(function (data) {
			$scope.getter = data.data
		},function () {
			console.log('error')
		})
 }
 var post = function (data) {
	var post = {
		method :'POST',
		url : '/user',
		data : data
	}
	$http(post).then(function () {
		console.log('success')
	},function () {
		console.log('error')
	})
 	
 }
 $scope.addproject = function () {
 	post({
 		project : {
 			projectName  : $scope.projectName
 		}
 	})
 }
})
