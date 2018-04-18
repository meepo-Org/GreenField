var app = angular.module('meepo' , []);

app.controller('myctrl' , function ($scope,$http) {
	$scope.done = function () {
	//Ajax
	console.log($scope)
	var post = {
		method :'POST',
		url : '/user',
		data :{
			user : $scope.name
		}
	}
	$http(post).then(function () {
		console.log('success')
	},function () {
		console.log('error')
	})

	var get={
		method:"GET",
		url : '/user'
	}
	$http(get).then(function (data) {
		$scope.getter = data.data
	},function () {
		console.log('error')
	})
	}
})