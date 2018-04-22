var app = angular.module('meepo' , ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/user", {
        templateUrl : "templates/login.html"
		})
 })