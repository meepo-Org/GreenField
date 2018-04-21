var app = angular.module('meepo')

app.component('signup', {
	templateUrl :'/templates/signup.html'
});

app.controller('signup' , function ($scope,$http ) 
{
  var get = function () 
  {
	var get = {
		method:"GET",
		url : '/user'
	}
		$http(get).then(function (data) 
		{
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
 	get()

	$scope.done = function () {
	//Ajax
	post({
			username : $scope.name ,
			password : $scope.password , 
			email : $scope.email
		})
	get()
	}
})
