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
            surveyData.themes[i].questions[j].question_type_template = '/templates/ratingQuestion.html'
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
    var totalsArray = [];
    var collatedResults = {
      average: null,
    };
    //construct totals array to add to collated_results
    for(var i = 0; i < 5; i++) {
      totalsArray.push({raw: 0, proportional: 0});
    }
    collatedResults.totals = totalsArray;

    //add up the total number of times a value was selected
    for(var i = 0; i < questionArray.length; i++) {
      if(!(questionArray[i].response_content === "" || questionArray[i].response_content === "0")) {
        responseTemp = parseInt(questionArray[i].response_content);
        responseTotal += responseTemp;
        validResponses++;
        collatedResults.totals[(responseTemp - 1)].raw++;
      }
    }

    //figure out relative totals (sets largest value to 100, then the others to proportions of that figure)
    mostSelected = findMax(collatedResults.totals);
    for(var i = 0; i < collatedResults.totals.length; i++) {
      collatedResults.totals[i].proportional = Math.round((collatedResults.totals[i].raw / mostSelected) * 100);
    }

    collatedResults.average = responseTotal / validResponses;
    return collatedResults;
  }

  //returns the most selected value in array of survey responses
  function findMax(totalsArray) {
    var max = 0;
    for(var i = 0; i < totalsArray.length; i++) {
      if(totalsArray[i].raw > max)
        max = totalsArray[i].raw;
    }
    return max;
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
