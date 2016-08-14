(function () {
    'use strict';

    angular
        .module('app')
        .controller('Login.IndexController', Controller);

    function Controller($location, AuthenticationService) {
        var vm = this;

        vm.login = login;

        initController();

        function initController() {
            // reset login status
            AuthenticationService.Logout();
        };

        function login() {
            vm.loading = true;
            AuthenticationService.Login(vm.contactEmail, vm.password, function (result, msg) {
                if (result === true) {
                    $location.path('/');
                } else {
                    vm.error = msg;
                    vm.loading = false;
                }
            });
        };
    }

})();