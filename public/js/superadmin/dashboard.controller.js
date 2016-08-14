(function () {
    'use strict';

    angular
        .module('app')
        .controller('Dashboard.IndexController', Controller);

    function Controller($stateParams, DashboardService) {
        var vm = this;
        vm.isExist = false;
        vm.societies = {};

        initController();

        function initController() {
            DashboardService.getSocietyList(function(error, data){
                if(error) {
                    console.log(data);
                    $state.go('home');
                } else {
                    vm.societies = data;
                    console.log(vm.societies);
                    if(vm.societies.length > 0)
                        vm.isExist = true; 
                }
            });
        }

        
        vm.currentSociety = new Object();
        vm.currentSociety.id = $stateParams.societyId;

        getSocietyDetails();

        function getSocietyDetails() {
            console.log($stateParams);
            DashboardService.getSocietyDetails(vm.currentSociety.id, function (error, data){
                if(error){
                    vm.currentSociety = null;
                } else {
                    vm.currentSociety = data;
                    getSocietyAdmin();
                    console.log("Current Society%o", vm.currentSociety);

                }
            });
        }

        function getSocietyAdmin(){
                DashboardService.getSocietyAdmin(vm.currentSociety.admin, function(error, data){
                    if (error) {
                        console.log(data);
                    } else {
                        vm.currentSociety.admin = {};
                        vm.currentSociety.admin = data;
                        
                    }
                })
            
        }
    }

    angular.module('app').controller('EditController', EditController);
    function EditController($stateParams, DashboardService) {
        var vm = this;
        vm.editingSociety = {};
        vm.loading = false;

        vm.editingSociety.id = $stateParams.editingSocietyId;

        getEditingSocietyDetails();

        function getEditingSocietyDetails(){
                DashboardService.getSocietyDetails(vm.editingSociety.id, function (error, data){
                if(error){
                    vm.editingSociety = null;
                    console.log(data);
                } else {
                    vm.editingSociety = data;
                    DashboardService.getSocietyAdmin(vm.editingSociety.admin, function(error, data){
                    if (error) {
                        console.log(data);
                    } else {
                        vm.editingSociety.admin = new Object();
                        vm.editingSociety.admin = data;
                        console.log(data);
                    }
                });
                }
            });
        }

        vm.save = function (data) {
            vm.loading = true;
            DashboardService.editSociety(data, function (error, response){
                if (error) {
                    vm.editingSociety = data;
                    console.log(response);
                    vm.loading = false;
                } else  {
                    vm.editingSociety = response;
                    vm.editingSociety.admin = data.admin;
                    vm.loading = false;
                }
            })
        };
    }

    angular.module('app').controller('AddController', AddController);

    function AddController(DashboardService) {
        var vm = this;
        vm.society = {};
        vm.loading = false;
        vm.society.admin = {};
        vm.society.modulesSubcribed = {};


        vm.addSociety = function(){

            angular.forEach(vm.society.modulesSubcribed, function (key, value) {
                vm.society.modulesSubcribed[key] = (value === "true");
                console.log(vm.society.modulesSubcribed);
            });

            vm.loading = true;
            DashboardService.addSociety(vm.society, vm.society.admin, function (error, response){
            if (error) {
                console.log(response);
                vm.loading = false;
            } else {
                vm.loading = false;
                console.log(response);
            }
        });
        };
    }
})();