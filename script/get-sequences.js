const getSequences = (packageName) => {
  const sequences = require(`${packageName}/Sequence_Property/Emoji_Test/index.js`);
  // TODO: Remove sorting logic once the upstream bug is addressed.
  // https://github.com/devongovett/regexgen/issues/31
  sequences.sort((a, b) => {
    // Longest strings first.
    const aLength = [...a].length;
    const bLength = [...b].length;
    if (aLength > bLength) {
      return -1;
    }
    if (aLength < bLength) {
      return 1;
    }
    // Lengths are equal; sort lexicographically from a-z.
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  return sequences;
};

module.exports = getSequences;
