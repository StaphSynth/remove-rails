var listApp = angular.module('removeRails', []);

listApp.controller('removeRailsController', function($http){
  var ctrl = this;
  ctrl.root = 'http://127.0.0.1:8000';
  ctrl.surveyIndices = [];
  ctrl.surveyDetails = {
    name: null,
    participantCount: null,
    submittedResponseCount: null
  };

  ctrl.getData = function(url, processData) {
    $http.get(ctrl.root + url)
      .then(function(response) {
        processData(response.data);
      })
      .catch(function(response) {
        alert('Data retrieval error\nCode: ' + response.status.toString());
      });
  };

  ctrl.surveyIndex = function(data) {
    ctrl.surveyIndices = data.survey_results;
  };

  ctrl.constructDisplay = function(data) {
    ctrl.surveyDetails.name = data.survey_result_detail.name;
    ctrl.surveyDetails.participantCount = data.survey_result_detail.participant_count;
    ctrl.surveyDetails.submittedResponseCount = data.survey_result_detail.submitted_response_count;
  };

  ctrl.getData('/index.json', ctrl.surveyIndex);

});
