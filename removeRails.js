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
  ctrl.loading = DataOp.getLoadingStatus;
  ctrl.loadSurvey = function(url) {
    DataOp.fetchSurveyData(url);
  };
  ctrl.getSurveyData = DataOp.getSurveyData;
  ctrl.testThemes = DataOp.getThemes;
});

rrApp.factory('DataOp', function($http) {
  var urlRoot = 'http://127.0.0.1:8000';
  var surveyIndex = null;
  var surveyData = null;
  var loading = false;

  function getData(path, callBack) {
    loading = true;
    $http.get(path)
      .then(function(response) {
        callBack(response.data);
      })
      .then(function() {
        loading = false;
      })
      .catch(function(error) {
        console.log(error);
        alert('Error!\nCode: ' + error.status.toString() + '\n' + error.statusText);
      });
  }

  function dataCrunch() {
    //this should really throw an error
    if(surveyData == null)
      return;

    for(var i = 0; i < surveyData.themes.length; i++) {
      for(var j = 0; j < surveyData.themes[i].questions.length; j++) {
        switch(surveyData.themes[i].questions[j].question_type) {
          case "ratingquestion":
            surveyData.themes[i].questions[j].collated_results = ratingQuestionCrunch(surveyData.themes[i].questions[j].survey_responses);
            break;
          default:
            console.log('Error in function dataCruch: invalid survey question type.');
        }
      }
    }
  }

  //deals with "ratingquestion" type question arrays
  //returns an object containing collated question data
  function ratingQuestionCrunch(questionArray) {
    var responseTemp = null;
    var responseTotal = 0;
    var validResponses = 0;
    var collated_results = {
      average: null,
      fives: 0,
      fours: 0,
      threes: 0,
      twos: 0,
      ones: 0
    };

    for(var i = 0; i < questionArray.length; i++) {
      if(questionArray[i].response_content) {
        responseTemp = parseInt(questionArray[i].response_content);
        responseTotal += responseTemp;
        validResponses++;
        switch(responseTemp) {
          case 5:
            collated_results.fives++;
            break;
          case 4:
            collated_results.fours++;
            break;
          case 3:
            collated_results.thees++;
            break;
          case 2:
            collated_results.twos++;
            break;
          case 1:
            collated_results.ones++;
            break;
        }
      }
    }

    collated_results.average = responseTotal / validResponses;
    return collated_results;
  }

  return {
    updateSurveyIndex : function(path) {
      surveyIndex = null;
      getData(urlRoot + path, function(data){
        surveyIndex = data.survey_results;
      });
    },

    fetchSurveyData : function(url) {
      surveyData = null;
      getData(urlRoot + url, function(data) {
        surveyData = data.survey_result_detail;
        dataCrunch();
      });
    },

    getSurveyIndex : function() {
      return surveyIndex;
    },

    getSurveyData : function() {
      return surveyData;
    },

    getLoadingStatus : function() {
      return loading;
    }
  }
});
