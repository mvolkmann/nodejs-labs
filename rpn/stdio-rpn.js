'use strict';

var stack = [];

function log(msg, silent) {
  if (!silent) {
    console.log(msg);
  }
}

function evaluate(value, silent) {
  var msg;
  var result;

  switch (value) {

  case '+':
  case '-':
  case '*':
  case '/':
    if (stack.length === 0) {
      msg = 'stack is empty';
      log(msg, silent);
      throw new Error(msg);
    }

    if (stack.length === 1) {
      msg = 'only one number on stack';
      log(msg, silent);
      throw new Error(msg);
    }

    var v1 = stack.pop();
    var v2 = stack.pop();
    var expr = v2 + value + v1;
    /*jshint evil: true */
    result = eval(expr);
    log(result, silent);
    stack.push(result);
    break;

  case 'stack':
    log(stack.toString(), silent);
    result = stack.toString();
    break;

  case 'exit':
    process.exit(0);
    break;

  default:
    var v = parseFloat(value);
    if (isNaN(v)) {
      result = 'invalid value';
      log(result, silent);
    } else {
      stack.push(v);
    }
  }

  return result;
}

function evaluateBuffer(buf) {
  var value = buf.toString().trim();
  try {
    evaluate(value);
  } catch (e) {
    // do nothing
  }
}

if (require.main === module) {
  process.stdin.on('data', evaluateBuffer);
  process.stdin.resume();
}

//module.exports = evaluate;
exports.evaluate = evaluate;
exports.stack = stack;
