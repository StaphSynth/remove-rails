var listApp = angular.module('removeRails', []);

listApp.controller('removeRailsController', function($http){
  var ctrl = this;
  ctrl.root = 'http://127.0.0.1:8000';
  ctrl.surveyIndices = [];

  ctrl.getData = function(url, processData) {
    $http.get(ctrl.root + url)
      .then(function(response) {
        if(response.status != 200) {
          //report a status error
        } else {
          //do something useful with the data
          processData(response.data);
        }
    });
  };

  ctrl.surveyIndex = function(data) {
    ctrl.surveyIndices = data.survey_results;
  };

ctrl.getData('/index.json', ctrl.surveyIndex);

});
