var app = angular.module('meepo' , ["ngRoute" ]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/user", {
        templateUrl : "templates/login.html"
    })
    .when('/login', {
        templateUrl: "templates/login.html" 
    })
    .when('/signup', {
        templateUrl: "templates/signup.html" 
    })
    .when('logout',{
    	templateUrl:"templates/app.html"
    })
    .when('/project',{
        templateUrl:"templates/project.html"
    })
})