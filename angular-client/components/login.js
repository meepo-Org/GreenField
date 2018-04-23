var app = angular.module('meepo')

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
		$scope.getter = data.data
	},function () {
		console.log('error')
	})
  }
 var post = function (data) {
	var requestData = {
		method :'POST',
		url : '/login',
		data : data
	}
	$http(requestData).then(function () {

	  $window.location.href = '#!/project'
	},function () {
	  console.log('error')
	})
 }
	$scope.login = function () {
	  post({
		username : $scope.nameLog ,
		password : $scope.passwordLog 
	  });
	  	$scope.logoutVisible = true;
		$scope.IsVisible = false ;
 	}
})