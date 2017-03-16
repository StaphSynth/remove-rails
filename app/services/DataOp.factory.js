/*==============================================================
DataOp (dataoperations) factory service for remove-rails app

Supplies data to the controller for display by the view

By David Allen
===============================================================*/

rrApp.factory('DataOp', function($http) {

  //factory 'globals'
  // var urlRoot = 'http://127.0.0.1:8000';
  var urlRoot = '';
  var surveyIndex = null;
  var surveyData = null;
  var loading = false;


  /*getData does what it says on the tin. Makes an XHR for the JSON files
  and calls the callback function to deal with the returned data*/

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
        if(error instanceof Error) {
          alert('Error\n' + error.message);
        } else if(error.status < 0) {
          alert('Server error\nStatus: ' + error.status.toString());
        } else {
          alert('Error!\nCode: ' + error.status.toString() + '\n' + error.statusText);
        }
      });
  }



  /*dataCrunch loops over the survey data and calls the appropriate function to deal
  with each question type. It then inserts the returned collated data structure into
  the theme object for the view, along with the location of the template to be called
  for display */

  function dataCrunch() {
    var surveyThemes = surveyData.themes;
    var themeQuestions = [];

    //this should really throw an error
    if(surveyThemes === null)
      return;

    for(var i = 0; i < surveyThemes.length; i++) {
      themeQuestions = surveyThemes[i].questions;
      for(var j = 0; j < themeQuestions.length; j++) {
        switch(themeQuestions[j].question_type) {
          case "ratingquestion":
            themeQuestions[j].collated_results = ratingQuestionCrunch(themeQuestions[j].survey_responses);
            themeQuestions[j].question_type_template = '/templates/ratingQuestion.html';
            break;
          default:
            console.log('Error in function dataCrunch: "' +
                        themeQuestions[j].question_type +
                        '" is an invalid survey question type.');
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


  //factory function returns (public methods)
  return {
    //fetchers: give the controller control over the getting and processing of data

    //fetch survey index data, takes a relative URL
    fetchSurveyIndex : function(path) {
      surveyIndex = null;
      getData(urlRoot + path, function(data){
        surveyIndex = data.survey_results;
      });
    },

    //fetches survey data. Takes a relative URL, calls dataCrunch to deal with results
    fetchSurveyData : function(url) {
      surveyData = null;
      getData(urlRoot + url, function(data) {
        surveyData = data.survey_result_detail;
        dataCrunch();
      });
    },

    //getters: Give the controller access to the service data
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
