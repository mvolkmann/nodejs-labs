'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Thermostat() {}
util.inherits(Thermostat, EventEmitter);

Thermostat.prototype.set = function (temperature) {
  this.temperature = temperature;
  if (temperature < 32) {
    this.emit('cold', temperature);
  } else if (temperature > 100) {
    this.emit('hot', temperature);
  }
};

var t = new Thermostat();
t.on('cold', function (temp) {
  // The event name is not made available to listener functions
  // unless the EventEmitter subclass is written to pass it to listeners.
  //console.log('got', this);
  console.log(temp + ' is too cold!');
});
t.on('hot', function (temp) {
  //console.log('got ' + this.type + ' event');
  console.log(temp + ' is too hot!');
});

t.set(50);
t.set(0);
t.set(110);
