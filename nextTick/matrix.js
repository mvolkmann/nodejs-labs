'use strict';

/**
 * Multiples corresponding values in row and column,
 * and sums those products.
 */
function multiplyHelper(row, column, cb) {
  var fn = function (sumSoFar, v1, index) {
    var v2 = column[index];
    return sumSoFar + v1 * v2;
  };

  // Don't hog event loop!
  setImmediate(function () {
    cb(row.reduce(fn, 0));
  });
}

/**
 * Multiplies two matrices asynchronously.
 * @param m1 first matrix
 * @param m2 second matrix
 * @param cb callback passed an error, if any, and result matrix.
 */
function multiply(m1, m2, cb) {
  var resultMatrix = [];
  var m1RowCount = m1.length;
  var m2ColumnCount = m2[0].length;
  var pending = m1RowCount * m2ColumnCount;

  // For each row in first matrix ...
  m1.every(function (row, rowIndex) {
    if (row.length !== m2.length) {
      cb('incompatible matrices');
      return false; // stop processing rows
    }

    // Add a new, empty row to result matrix.
    var resultRow = [];
    resultMatrix.push(resultRow);

    // For each column index in second matrix ...
    for (var columnIndex = 0; columnIndex < m2ColumnCount; columnIndex++) {
      // Get column c in second matrix.
      var column = m2.map(function (m2Row) {
        return m2Row[columnIndex];
      });

      multiplyHelper(row, column, function (value) {
        // Add calculated value to result matrix.
        resultRow.push(value);
        pending--;
        if (pending === 0) {
          cb(null, resultMatrix);
        }
      });
    }

    return true; // continue processing rows
  });
}

exports.multiply = multiply;
