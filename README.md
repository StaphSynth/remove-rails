# remove-rails

A front-end data display coding exercise. This AngularJS app displays mock employee survey data using a front-end framework. After bootstrapping, the app attempts to load a list of surveys from `/index.json`. It then presents the list of available surveys to the user. The user may then select which set of survey results they'd like to view. The data from the selected survey are loaded from `/survey_results/selected_survey.json` when the user requests it, processed, and presented on screen.

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

* Make sure you have Node.js installed
* Open a terminal and navigate to the project folder
* `$ npm install`
* `$ node ./node_modules/karma/bin/karma start`


<!-- * `$ ./node_modules/.bin/webdriver-manager update`
* `$ ./node_modules/.bin/webdriver-manager start` -->
