/*
* Remove Rails. A coding exercise to pretend to remove Rails from a data render pipeline and shift the burden to the client.
* Written using AngularJS v1.6.2
* By David Allen
*/

var rrApp = angular.module('removeRails', []);

rrApp.controller('removeRailsController', function(DataOp){
  var ctrl = this;
  ctrl.surveyIndices = [];
  ctrl.surveyDetails = {
    name: null,
    participantCount: null,
    submittedResponseCount: null
  };

  function getData(path, processData) {
    DataOp.getData(path)
      .then(function(response) {
        processData(response.data);
      })
      .catch(function(error) {
        console.log(error);
        alert('Error!\nCode: ' + error.status.toString() + '\n' + error.statusText);
      });

  }

  ctrl.surveyIndex = function(data) {
    ctrl.surveyIndices = data.survey_results;
  };

  ctrl.constructDisplay = function(data) {
    ctrl.surveyDetails.name = data.survey_result_detail.name;
    ctrl.surveyDetails.participantCount = data.survey_result_detail.participant_count;
    ctrl.surveyDetails.submittedResponseCount = data.survey_result_detail.submitted_response_count;

    console.log(data);
  };

  getData('/index.json', ctrl.surveyIndex);

});

rrApp.factory('DataOp', function($http) {
  var urlRoot = 'http://127.0.0.1:8000';
  var DataOp = {};

  DataOp.getData = function(path) {
    return $http.get(urlRoot + path);
  };

  return DataOp;
});
