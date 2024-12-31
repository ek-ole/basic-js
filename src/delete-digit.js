const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  let nArray = n.toString().split('');
  let max = 0;
  for (let i = 0; i < nArray.length; i += 1) {
    let tempArray = [...nArray];
    tempArray.splice(i, 1);
    let newNumber = parseInt(tempArray.join(''));
    max = Math.max(max, newNumber);
  }
  return max;
}

module.exports = {
  deleteDigit
};
