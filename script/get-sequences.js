const getSequences = (packageName) => {
  const sequences = require(`${packageName}/Sequence_Property/Emoji_Test/index.js`)
    // https://github.com/devongovett/regexgen/issues/31
    .sort();
  return sequences;
};

module.exports = getSequences;
