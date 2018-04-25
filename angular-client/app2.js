app = angular.module('meepo2' , ["ngRoute"]);

app.config(['$routeProvider' , function($routeProvider) {
    $routeProvider
    .when("/profile", {
        templateUrl : "templates/profile.html"
    })
    .when("/tasks", {
        templateUrl : "templates/tasks.html"
    })

}])