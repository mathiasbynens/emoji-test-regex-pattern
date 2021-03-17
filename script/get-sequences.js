const getSequences = (packageName) => {
  const sequences = require(`${packageName}/Sequence_Property/Emoji_Test/index.js`);
  sequences.sort((a, b) => {
    // Longest strings first.
    if ([...a].length > [...b].length) {
      return -1;
    }
    if ([...a].length < [...b].length) {
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
