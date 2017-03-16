exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: ['app/e2e/e2e.spec.js'],

  multiCapabilities: [{
    'browserName': 'chrome'
  },
  {
    'browserName': 'firefox'
  }]

};