const regenerate = require('regenerate');

const toHex = (codePoint) => {
  return codePoint.toString(16).toUpperCase();
};

regenerate.prototype.toCssUnicodeRange = function() {
  const buf = [];
  const data = this.data;
  // Iterate over the data per `(start, end)` pair.
  let index = 0;
  const length = data.length;
  const loneCodePoints = [];
  const ranges = [];
  while (index < length) {
    let start = data[index];
    let end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.
    if (start === end) {
      buf.push(`U+${toHex(start)}`);
    } else {
      buf.push(`U+${toHex(start)}-${toHex(end)}`);
    }
    index += 2;
  }
  return buf.join(',');
};

const generateCssUnicodeRange = (strings) => {
  const reSet = regenerate();
  for (const string of strings) {
    reSet.add(...string);
  }
  return reSet.toCssUnicodeRange();
};

module.exports = generateCssUnicodeRange;
