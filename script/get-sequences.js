const getSequences = (packageName) => {
  const sequences = require(`${packageName}/Sequence_Property/Emoji_Test/index.js`)
    // Sort by code point length; longest sequences first.
    .sort((a, b) => [...b].length - [...a].length);
  return sequences;
};

module.exports = getSequences;
