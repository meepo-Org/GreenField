var app = angular.module('meepo2' );

app.component('profile', {
	templateUrl :'/templates/profile.html'
});

app.controller('profile' , function ($scope , $http) {
	  var get = function () {
		var response={
			method:"GET",
			url : '/user'
		}
			$http(response).then(function (data) {
				$scope.user = data.data;
			},function () {
				console.log('error')
			});
	 }
	 get()
})