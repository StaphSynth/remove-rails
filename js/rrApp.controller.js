var rrApp = angular.module('removeRails', []);

rrApp.controller('removeRailsController', function($location, DataOp){
  var ctrl = this;

  ctrl.surveyIndices = DataOp.getSurveyIndex;
  ctrl.loading = DataOp.getLoadingStatus;
  ctrl.selected = '';
  ctrl.getSurveyData = DataOp.getSurveyData;


  ctrl.pushButton = function(url, name) {
    DataOp.fetchSurveyData(url);
    ctrl.selected = name;
  };

  DataOp.updateSurveyIndex('index.json');
});
