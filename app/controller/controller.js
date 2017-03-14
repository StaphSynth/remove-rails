rrApp.controller('removeRailsController', function($location, DataOp) {
  var ctrl = this;

  ctrl.surveyIndices = DataOp.getSurveyIndex;
  ctrl.loading = DataOp.getLoadingStatus;
  ctrl.selected = '';
  ctrl.getSurveyData = DataOp.getSurveyData;

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

  ctrl.pushButton = function(url, name) {
    DataOp.fetchSurveyData(url);
    ctrl.selected = name;
  };

  DataOp.updateSurveyIndex('index.json');
});
