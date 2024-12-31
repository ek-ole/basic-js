const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error ("'arr' parameter must be an instance of the Array!")
  }
  if (arr.length === 0) return [];

  let copyArr = [...arr];

  for (let i = 0; i < copyArr.length; i++) {
    if (copyArr[i] === "--double-next") {
      if (i === copyArr.length - 1) {
        copyArr.splice(i, 1);
      } else {
        copyArr.splice(i, 1, copyArr[i + 1]);
      }
    } else if (copyArr[i] === "--double-prev") {
      if (i === 0) {
        copyArr.splice(0, 1);
      } else {
        copyArr.splice(i, 1, copyArr[i - 1]);
      }
    } else if (copyArr[i] === "--discard-next") {
      if (i === copyArr.length - 1) {
        copyArr.splice(i, 1);
      } else if (
        copyArr[i + 2] === "--double-prev" ||
        copyArr[i + 2] === "--discard-prev"
      ) {
        copyArr.splice(i, 3);
      } else {
        copyArr.splice(i, 2);
      }
    } else if (copyArr[i] === "--discard-prev") {
      if (i === 0) {
        copyArr.splice(0, 1);
      } else {
        copyArr.splice(i - 1, 2);
      }
    }
  }
  return copyArr;
}

module.exports = {
  transform
};
