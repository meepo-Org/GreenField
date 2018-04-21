var app =angular.module('meepo')

app.component('login', {
	templateUrl :'/templates/login.html'
});

app.controller('login' , function ($scope,$http ) {
	var get = function () {
	var get={
		method:"GET",
		url : '/login'
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
		url : '/login',
		data : data
	}
	$http(post).then(function () {
		console.log('success')
	},function () {
		console.log('error')
	})
 	
 }
	$scope.login = function () {
		post({
			username : $scope.nameLog ,
			password : $scope.passwordLog 
		})
	}
})