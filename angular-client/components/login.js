var app = angular.module('meepo')

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
			
			$scope.getLogin = data.data
			console.log("scoope get Login",$scope.getLogin)
		},function () {
			console.log('error')
		})
 }
 var post = function (data) {
 	//$scope.getLogin = data.data
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