var app = angular.module('meepo' , ["ngRoute"]);

app.controller('signup' , function ($scope,$http ) {
  var get = function () {
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
app.controller('project' , function ($scope,$http ) {
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
 $scope.addproject = function () {
 	console.log($scope.projectName)
 }
})

app.config(function($routeProvider) {
    $routeProvider
    .when("/user", {
        templateUrl : "templates/login.html"
		})
 })