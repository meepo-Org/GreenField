var app = angular.module('meepo');

app.component('app', {
	templateUrl :'/templates/app.html'
});

app.controller('app' , function ($scope,$http ) {
  var get = function () {
	var response={
		method:"GET",
		url : '/logout'
	}
	$http(response).then(function (data) {
	},function () {
		console.log('error')
	})
  }

	$scope.logout = function () {
	  get()
 	}
})