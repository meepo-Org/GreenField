var app = angular.module('meepo' , []);

app.controller('myctrl' , function ($scope,$http) {
	//Ajax

	$scope.done = function () {
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
	}

})