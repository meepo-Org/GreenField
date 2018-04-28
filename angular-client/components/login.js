var app = angular.module('mainApp');
app.component('login', {
	templateUrl :'/templates/login.html'
});
app.controller('login' , function ($scope,$http,$window ) {
	var get = function () {
		var response={
			method:"GET",
			url : '/login'
		}
		$http(response).then(function (data) {
			console.log(data)
			$scope.getter = data.data;
		},function () {
			console.log('error')
		});
	}
	var post = function (data) {
		var requestData = {
			method :'POST',
			url : '/login',
			data : data
		}
		$http(requestData).then(function () {
			$window.location.href = 'app2.html';
		},function () {
			console.log('error')
		})
	}
	$scope.login = function () {
		if ($scope.nameLog === undefined || $scope.nameLog ===' ') {
			alert("there's no user");
		}else if($scope.passwordLog === undefined || $scope.passwordLog ===' '){
			alert("there's no password");
		}
		post({
			username : $scope.nameLog ,
			password : $scope.passwordLog 
		});
	}
})