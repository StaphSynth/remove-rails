//Test suite for DataOp factory

describe('DataOp Factory', function() {
  var dataOp;

  //load the module
  beforeEach(angular.mock.module('removeRails'));

  //inject dependancies
  beforeEach(inject(function(_DataOp_) {
    dataOp = _DataOp_;
  }));

  //test specs

  it('should exist', function() {
    expect(dataOp).toBeDefined();
  });
});
