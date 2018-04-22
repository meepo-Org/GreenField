var app = angular.module('meepo')
.component('signup', {
	templateUrl :'/templates/signup.html'
});

app.controller('signup' , function ($scope,$http ) {
  var get = function () {
	var get={
		method:"GET",
		url : '/user'
	}
		$http(get).then(function (data) {
			console.log($scope.getter);
			$scope.getter = data.data
			console.log($scope.getter);
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
	//abdulhameed transfare to login page
	$scope.log = function () {

	}
	//=======
})