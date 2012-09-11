'use strict';
/*global dnode: false, shoe: false */

var remote;

function $(id) {
  return document.getElementById(id);
}

function scoreChanged(score) {
  $('score').innerHTML = score;
  var intScore = parseInt(score, 10);
  remote.gradeScore(intScore, function (grade) {
    $('grade').innerHTML = grade;
  });
}

window.onload = function () {
  var stream = shoe('/dnode');
  var dn = dnode();

  dn.on('remote', function (theRemote) {
    remote = theRemote;
  });

  $('slider').onchange = function (event) {
    scoreChanged(event.target.value);
  };
};
