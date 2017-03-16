//Unit test suite for DataOp factory

describe('DataOp Factory', function() {
  var DataOp;

  //load the module
  beforeEach(angular.mock.module('removeRails'));

  // inject dependancy
  beforeEach(inject(function(_DataOp_) {
    DataOp = _DataOp_;
  }));

  it('should exist', function() {
    expect(DataOp).toBeDefined();
  });

  describe('DataOp methods', function() {

    //instantiate global
    var $http;
    var $httpBackend;

    //inject dependancy
    beforeEach(inject(function(_$http_,  _$httpBackend_) {
      $http = _$http_;
      $httpBackend = _$httpBackend_;
    }));

    describe('getLoadingStatus method', function() {

      it('should return false when the app is idle', function() {
        expect(DataOp.getLoadingStatus()).toEqual(false);
      });
    });

    //test the async data-fetching methods of DataOp
    describe('testing the DataOp fetch functions', function() {

      it('DataOp.fetchSurveyIndex should fetch the JSON data via $http', function() {

        mockResponse = {
          "survey_results": [
            {
              "name": "Simple Survey",
              "url": "/survey_results/1.json",
              "participant_count": 6,
              "response_rate": 0.8333333333333334,
              "submitted_response_count": 5
            },
            {
              "name": "Acme Engagement Survey",
              "url": "/survey_results/2.json",
              "participant_count": 271,
              "response_rate": 1.0,
              "submitted_response_count": 271
            }
          ]
        };

        //set up the $http env
        $httpBackend.expectGET('index.json').respond(200, JSON.stringify(mockResponse));

        //call the function under test
        DataOp.fetchSurveyIndex('index.json');

        //flush the output
        $httpBackend.flush();

        //assert
        expect(DataOp.getSurveyIndex()).toEqual(mockResponse.survey_results);
      });
    });
  });
});
