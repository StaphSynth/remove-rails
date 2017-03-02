var listApp = angular.module('removeRails', []);

listApp.controller('removeRailsController', function($http){
  var ctrl = this;

  $http.get('http://127.0.0.1:8000/index.json')
    .then(function(response) {
      ctrl.handleResponse(response);
    });

  ctrl.handleResponse = function(response) {
    if(response.status != 200) {
      //report a status error
    } else {
      //call a function to do something useful with the data
    }
  };

});
