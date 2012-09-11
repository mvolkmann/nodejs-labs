'use strict';

var _ = require('underscore');

var tests = [];

function grade(name, score) {
  tests.push({name: name, score: score});
}

grade('Doug', 84);
grade('Mark', 92);
grade('Doug', 91);
grade('Mark', 79);
grade('Doug', 68);
grade('Mark', 100);

var grouped = _.groupBy(tests, 'name');
Object.keys(grouped).forEach(function (name) {
  var arr = grouped[name];
  var scores = _.pluck(arr, 'score');
  var total = _.reduce(scores, function (n1, n2) { return n1 + n2; });
  console.log(name, total / scores.length);
});
