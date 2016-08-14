(function () {
  'use strict';

  angular
    .module('app')
    .factory('DashboardService', DashboardService);

  function DashboardService($http) {
    var service = {};

    service.getSocietyList = getSocietyList;
    service.getSocietyDetails = getSocietyDetails;
    service.getSocietyAdmin = getSocietyAdmin;
    service.editSociety = editSociety;
    service.addSociety = addSociety;

    return service;

    function addSociety(society, admin, callback){
      console.log(society);
      admin.role = "Admin";
       $http.post('/api/register', admin).success(function(response){
          if(response.error){
            callback(true, response.message);
          } else {
                society.admin = response.data.id;
                $http.post('/api/addSociety', society).success(function (resp){
                  if(resp.error){
                    callback(true, resp.message);
                    } else {
                    callback(false, resp);
                    }
                });
          }
        });
     }

          

    function getSocietyList(callback) {
      $http.get('/api/getsocietylist')
        .success(function (response) {
          if(response.error) 
            callback(true, response.message);
          else {
            callback(false, response.data);
          }
        })
        .error(function (data) {
          callback(true, "Network Problem");
        })
    }

    function getSocietyAdmin(adminId, callback){
      $http.get('/api/getUser/'+adminId)
      .success(function (response) {
          if(response.error) 
            callback(true, response.message);
          else {
            callback(false, response.data);
          }
        })
        .error(function (data) {
          callback(true, "Network Problem");
        })
    }

    function getSocietyDetails(societyId, callback) {
      $http.get('/api/getsocietydetails/'+societyId)
      .success(function (response) {
          if(response.error) 
            callback(true, response.message);
          else {
            callback(false, response.data);
          }
        })
        .error(function (data) {
          callback(true, "Network Problem");
        })
    }

    function editSociety(data, callback){
      console.log("Given data %o", data);
      $http.put('/api/editSociety/'+data._id, data)
        .success(function (response){
          if(response.error) 
            callback(true, response.message);
          else {
            $http.put('/api/editUser/'+data.admin._id, data.admin)
            .success(function (resp){
              response.data.admin = resp.data;
              console.log("Updated data %o", response.data);
              callback(false, response.data);
            })
            .error(function (data){
               callback(true, "Network Problem");
            });
          }
        })
        .error(function (data){
          callback(true, "Network Problem");
        })
    }
  }
})();