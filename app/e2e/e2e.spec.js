//End-to-end test spec for remove-rails

//these tests expect the app to be running at localhost:8000
describe('E2E testing of the remove rails app', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1:8000');
  });


  it('should exist and contain a heading', function() {
    expect(element(by.css('h1')).getText()).toEqual('Survey Results');
  });

  describe('Check that page elements load only after survey buttons are clicked', function() {
    var surveyButtons;

    //get the list of survey buttons
    beforeEach(function() {
      surveyButtons = element.all(by.repeater('index in ctrl.surveyIndices()'));
    });

    it('should render p.surveyMeta data when a button is clicked', function() {

      //this p element should not exist before a survey button is clicked
      expect(element(by.css('p.surveyMeta')).isPresent()).toBe(false);

      surveyButtons.get(0).click();

      expect(element(by.css('p.surveyMeta')).isPresent()).toBe(true);
    });


    it('should render div#dataPresentationContainer when a button is clicked', function() {

      //this div should not exist before a button is clicked
      expect(element(by.css('div#dataPresentationContainer')).isPresent()).toBe(false);

      surveyButtons.get(0).click();

      expect(element(by.css('div#dataPresentationContainer')).isPresent()).toBe(true);
    });
  });

  describe('The correct mark-up template has been used to display data sets', function() {
    var surveyButtons;

    //get list of survey buttons
    beforeEach(function() {
      surveyButtons = element.all(by.repeater('index in ctrl.surveyIndices()'));
    });

    it('uses the "ratingQustion" template to render ratingquestion-type question data', function() {
      //loop through the data display elements in each theme checking the above

      //display some survey data
      surveyButtons.get(0).click();

      var themes = element.all(by.repeater('theme in ctrl.getSurveyData().themes'));
      var questionData;

      for(var i = 0; i < themes.count(); i++) {
        questionData = element.all(by.repeater('question in theme.questions'));
        for(var j = 0; j < questionData.count(); j++) {
          expect(questionData.element(by.css('div.ratingquestion'))
            .element(by.css('div.barGraphContainer')).isPresent()).toBe(true);
        }
      }
    });

  });
});
