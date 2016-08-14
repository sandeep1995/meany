(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngMessages', 'ngStorage'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // app routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/superadmin/dashboard.html',
                controller: 'Dashboard.IndexController',
                controllerAs: 'vm'
            })
            .state('societydetails', {
                url: '/society/{societyId}',
                templateUrl: '/superadmin/details.html',
                controller: 'Dashboard.IndexController',
                controllerAs: 'vm'
            })
            .state('editsociety',{
                url: '/edit/{editingSocietyId}',
                templateUrl: '/superadmin/edit.html',
                controller: 'EditController',
                controllerAs: 'vm'
            })
            .state('add', {
                url: '/add',
                templateUrl: '/superadmin/add.html',
                controller: 'AddController',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/superadmin/login.html',
                controller: 'Login.IndexController',
                controllerAs: 'vm'
            });
            $urlRouterProvider.otherwise("/");
    }



    function run($rootScope, $http, $location, $localStorage, $state, $stateParams) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization =  $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            console.log(localStorage);
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                console.log(localStorage.currentUser);
                $location.path('/login');
            }
        });
    }
})();