//Test suite for DataOp factory

describe('DataOp Factory', function() {
  var DataOp;

  //load the module
  beforeEach(angular.mock.module('removeRails'));

  //inject dependancy
  beforeEach(inject(function(_DataOp_) {
    DataOp = _DataOp_;
  }));

  //test specs

  it('should exist', function() {
    expect(DataOp).toBeDefined();
  });

  describe('DataOp methods', function() {

    //instantiate global
    var $http;

    //inject dependancy
    beforeEach(inject(function(_$http_) {
      $http = _$http_;
    }));

    describe('getLoadingStatus method', function() {

      it('should return false when the app is idle', function() {
        expect(DataOp.getLoadingStatus()).toEqual(false);
      });
    });


  });

});
