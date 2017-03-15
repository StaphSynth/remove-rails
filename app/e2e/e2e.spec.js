//End-to-end test spec for remove-rails

//these tests expect the app to be live and running at localhost:8000
describe('E2E testing of the remove rails app', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1:8000');
  });

  it('should exist and contain a heading', function() {
    expect(element(by.css('h1')).getText()).toEqual('Survey Results');
  });

  // it('should load index.json', function() {
  //   //do stuff
  // });
});
