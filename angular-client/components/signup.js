var app = angular.module('meepo');
app.component('signup', {
	templateUrl :'/templates/signup.html'
});
app.controller('signup' , function ($scope,$http ) {
	  var get = function () {
		var response={
			method:"GET",
			url : '/user'
		}
			$http(response).then(function (data) {
				$scope.getter = data.data;
			},function () {
				console.log('error')
			});
	 }
	 var post = function (data) {
		var requestData = {
			method :'POST',
			url : '/user',
			data : data
		}
		$http(requestData).then(function () {
			console.log('success')
		},function () {
			console.log('error')
		});
	 }
  get();

  $scope.done = function () {
  post({
		username : $scope.username ,
		email : $scope.email,
		password : $scope.password
      })
	get()
  }
	//abdulhameed transfare to login page
	$scope.log = function () {

	}
	//=======
})

