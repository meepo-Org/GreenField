var app = angular.module('mainApp' , ["ngRoute" ]);

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

app2 = angular.module('mainProject' , ["ngRoute"]);

app2.config(['$routeProvider' , function($routeProvider) {
    $routeProvider
    .when("/profile", {
        templateUrl : "templates/profile.html"
    })
    .when("/tasks", {
        templateUrl : "templates/tasks.html"
    })

}])

var app3 = angular.module('mainTask' , []);
