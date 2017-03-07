/*
* Remove Rails. A coding exercise to pretend to remove Rails from a data render pipeline and shift the burden to the client.
* Written using AngularJS v1.6.2
* By David Allen
*/

var rrApp = angular.module('removeRails', []);

rrApp.controller('removeRailsController', function(DataOp){
  var ctrl = this;

  DataOp.updateSurveyIndex('/index.json');
  ctrl.surveyIndices = DataOp.getSurveyIndex;
});

rrApp.factory('DataOp', function($http) {
  var urlRoot = 'http://127.0.0.1:8000';
  var surveyIndex = [];

  function getData(path, callBack) {
    $http.get(path)
      .then(function(response) {
        callBack(response.data);
      })
      .catch(function(error) {
        console.log(error);
        alert('Error!\nCode: ' + error.status.toString() + '\n' + error.statusText);
      });
  }

  function setSurveyIndex(data) {
    surveyIndex = data.survey_results;
  }

  return {
    updateSurveyIndex : function(path) {
      getData(urlRoot + path, setSurveyIndex);
    },

    getSurveyIndex : function() {
      return surveyIndex;
    }
  }
});
