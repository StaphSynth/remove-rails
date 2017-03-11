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
