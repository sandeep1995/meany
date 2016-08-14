(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthService);

    function AuthService($http, $localStorage) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(contactEmail, password, callback) {
            $http.post('/api/authenticateSuper', { contactEmail: contactEmail, password: password, role: 'Super Admin' })
                .success(function (response) {
                    // login successful if there's a token in the response
                    if (response.error) {
                        // execute callback with false to indicate failed login
                        callback(false, response.message);
                    } else {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { id: response.id, contactEmail: contactEmail, token: response.token };
                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = response.token;
                        // execute callback with true to indicate successful login
                        callback(true);
                    }
                })
                .error(function(data){
                    callback(false, "Network problem");
                });
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();