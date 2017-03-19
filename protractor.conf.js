var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: ['app/e2e/e2e.spec.js'],

  multiCapabilities: [{
    'browserName': 'chrome'
  },
  {
    'browserName': 'firefox'
  }],

  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  }

};
