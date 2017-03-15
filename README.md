# remove-rails

A front-end data display coding exercise. This AngularJS app displays mock employee survey data using a front-end framework. After bootstrapping, the app attempts to load a list of surveys from `/index.json`. It then presents the list of available surveys to the user. The user may then select which set of survey results they'd like to view. The data from the selected survey are loaded from `/survey_results/selected_survey.json` upon request, processed, and presented on screen.

Each survey is divided into a number of themes, and each theme has multiple questions. The questions themselves may have different forms (perhaps a 'strongly disagree, disagree, neutral, agree, strongly agree' style, or binary 'yes/no', etc).

The app cycles through each theme and calls the appropriate function to process the data for each question type. Since each question type will have a different data structure (after all, there's no point displaying the average of a 'yes/no' question), the view then steps through the processed data and selects the required mark-up template to display the results of each question.

The fact that the mock data contain only one question type is completely beside the point ;)

### Running the app

* Clone the repo.
* Open a terminal and navigate to the `app/` directory within the project folder.
* Launch python simple HTTP server using `path/to/remove-rails/app $ python -m SimpleHTTPServer`
* Point your browser to `localhost:8000`
* Have fun!

### Running the test suite

The test suite consists of unit tests and end-to-end tests written using the Jasmine test framework. The unit tests are run using the karma test runner and require the presence of Chrome and Firefox. The end-to-end tests are run using Protractor and launch Chrome only.

First:
* Make sure you have Node.js >= v5 installed
* Make sure you have Chrome and Firefox installed
* Open a terminal and navigate to the project folder
* `$ npm install`

#### Running the unit tests
* `$ node ./node_modules/karma/bin/karma start`

#### Running the end-to-end tests
* Serve the app at `localhost:8000`
* `$ node ./node_modules/.bin/webdriver-manager update`
* `$ node ./node_modules/.bin/webdriver-manager start`
* `$ node ./node_modules/.bin/protractor protractor.conf.js`
