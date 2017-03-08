/*
* Remove Rails. A coding exercise to pretend to remove Rails from a data render pipeline and shift the burden to the client.
* Written using AngularJS v1.6.2
* By David Allen
*/

var rrApp = angular.module('removeRails', []);

rrApp.controller('removeRailsController', function(DataOp){
  var ctrl = this;

  DataOp.updateSurveyIndex('index.json');
  ctrl.surveyIndices = DataOp.getSurveyIndex;
  ctrl.loading = DataOp.getLoadingStatus;
  ctrl.loadSurvey = function(url) {
    DataOp.fetchSurveyData(url);
  };
  ctrl.getSurveyData = DataOp.getSurveyData;
});

rrApp.factory('DataOp', function($http) {
  // var urlRoot = 'http://127.0.0.1:8000';
  var urlRoot = '';
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
            console.log('Error in function dataCrunch: invalid survey question type.');
        }
      }
    }
  }

  //deals with "ratingquestion" type question arrays
  //returns an object containing collated question data
  function ratingQuestionCrunch(questionArray) {
    var responseTemp = null;
    var mostSelected;
    var responseTotal = 0;
    var validResponses = 0;

    var collated_results = { //snake case to keep it the same as the JSON source
      average: null,
      value_totals: [0,0,0,0,0], //represents the total number of times 5->1 was selected
                                 //(valueTotals[0] == 5, valueTotals[1] == 4, etc)
      relative_totals: [0,0,0,0,0] //relative values used for generating graphs, etc. Derived from value_totals
    };

    //add up the total number of times a value was selected
    for(var i = 0; i < questionArray.length; i++) {
      if(questionArray[i].response_content) {
        responseTemp = parseInt(questionArray[i].response_content);
        responseTotal += responseTemp;
        validResponses++;
        switch(responseTemp) {
          case 5:
            collated_results.value_totals[0]++;
            break;
          case 4:
            collated_results.value_totals[1]++;
            break;
          case 3:
            collated_results.value_totals[2]++;
            break;
          case 2:
            collated_results.value_totals[3]++;
            break;
          case 1:
            collated_results.value_totals[4]++;
            break;
        }
      }
    }

    //figure out relative totals (sets largest value to 100, then the others to proportions of that figure)
    mostSelected = Math.max.apply(Math, collated_results.value_totals);
    for(var i = 0; i < collated_results.value_totals.length; i++) {
      collated_results.relative_totals[i] = Math.round((collated_results.value_totals[i] / mostSelected) * 100);
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
