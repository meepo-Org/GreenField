var app = angular.module('mainProject' );

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