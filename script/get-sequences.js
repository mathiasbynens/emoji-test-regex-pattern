// Additional emoji sequences that we want to include in the regular
// expression pattern, even if they’re not yet in emoji-test.txt.
// TODO: Remove this special-casing once these sequences land upstream.
const EXTRA_SEQUENCES = [
  '\u2615\uFE0F', // hot beverage, as entered via iOS emoji picker

  '\u{1F91D}\u{1F3FB}', // handshake: light skin
  '\u{1F91D}\u{1F3FC}', // handshake: medium-light skin
  '\u{1F91D}\u{1F3FD}', // handshake: medium skin
  '\u{1F91D}\u{1F3FE}', // handshake: medium-dark skin
  '\u{1F91D}\u{1F3FF}', // handshake: dark skin

  '\u{1F93C}\u{1F3FB}', // wrestlers: light skin
  '\u{1F93C}\u{1F3FC}', // wrestlers: medium-light skin
  '\u{1F93C}\u{1F3FD}', // wrestlers: medium skin
  '\u{1F93C}\u{1F3FE}', // wrestlers: medium-dark skin
  '\u{1F93C}\u{1F3FF}', // wrestlers: dark skin
];

const getSequences = (packageName) => {
  const Emoji_Test = require(`${packageName}/Sequence_Property/Emoji_Test/index.js`);
  const sequences = [...Emoji_Test, ...EXTRA_SEQUENCES];
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
