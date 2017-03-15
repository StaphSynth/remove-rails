describe('testing the e2e framework', function() {
  it('should add an item to my to-do list app', function() {
    browser.get('http://syntheta.se/coding/2017/02/21/AngularJS-todo-list.html');

    element(by.css('input.taskInput')).sendKeys('learn to use protractor');
    element(by.css('input.submitButton')).click();


    var todoList = element.all(by.repeater('item in ctrl.list'));
    expect(todoList.count()).toEqual(1);
    expect(todoList.get(0).element(by.css('span.task')).getText()).toEqual('learn to use protractor');
  });
});
