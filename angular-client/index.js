var app = angular.module('meepo' , []);

app.controller('myctrl' , function ($scope,$http) {
	var get={
		method:"GET",
		url : '/user'
	}
	$scope.done = function () {
	//Ajax
	var post = {
		method :'POST',
		url : '/user',
		data :{
			username : $scope.name ,
			password : $scope.password , 
			email : $scope.email
		}
	}
	$http(post).then(function () {
		console.log('success')
	},function () {
		console.log('error')
	})
	$http(get).then(function (data) {
		$scope.getter = data.data
	},function () {
		console.log('error')
	})
	}

		$http(get).then(function (data) {
		$scope.getter = data.data
	},function () {
		console.log('error')
	})
})