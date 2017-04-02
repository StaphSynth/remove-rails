/*==============================================================
Main controller for remove-rails app

Ties the view to data provided by the DataOp factory service.
Performs a bit of house-keeping - keeps track of selected
datasets, etc.

By David Allen
===============================================================*/

rrApp.controller('removeRailsController', function(DataOp) {
  var ctrl = this;

  //controller 'globals' accessed by the view.
  //tie the view to the data service
  ctrl.surveyIndices = DataOp.getSurveyIndex;
  ctrl.loading = DataOp.getLoadingStatus;
  ctrl.selected = '';
  ctrl.getSurveyData = DataOp.getSurveyData;


  //returns survey index meta data for display by the view
  ctrl.getSurveyIndexText = function() {
    var text;
    var surveyIndex = DataOp.getSurveyIndex();

    if(surveyIndex === null) {
      return;
    }

    if(surveyIndex.length > 0) {
      text = surveyIndex.length.toString();
      if(surveyIndex.length > 1) {
        text += ' surveys';
      } else {
        text += ' survey';
      }
      text += ' found, click to view.'
    } else {
      text = 'No survey data found.';
    }

    return text;
  };

  /*called by the buttons in the view. retrieves correct
  dataset and sets 'selected' for special CSS styling */
  ctrl.pushButton = function(url, name) {
    DataOp.fetchSurveyData(url);
    ctrl.selected = name;
  };

  //grab the index data to start the show
  DataOp.fetchSurveyIndex('index.json');
});
