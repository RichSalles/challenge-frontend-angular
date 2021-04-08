angular.module('main', ['ngRoute'])
    .config(['$routeProvider',
        function($routeProvider) {
            
            $routeProvider
                .when('/home', {
                    templateUrl: 'template/home.html',
                    controller: 'homeControllerPlatform'
                })
                .when('/plans', {
                    templateUrl: 'template/plans.html',
                    controller: 'plansController'
                })
                .when('/personal-data', {
                    templateUrl: 'template/personal-data.html',
                    controller: 'dataUserController'
                });

                $routeProvider.otherwise({
                    redirectTo: "/home"
                });
        }
])