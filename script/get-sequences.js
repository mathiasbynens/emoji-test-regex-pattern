// Additional emoji sequences that we want to include in the regular
// expression pattern, even if they’re not (yet) in emoji-test.txt.
// Note that sequences must never be removed from this list, not even
// once they’re added upstream, to ensure that generated output for
// older Emoji versions still includes them.
const EXTRA_SEQUENCES = [
  // The following handshake emoji sequences were officially added in
  // Emoji 14.0.
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

  // Overqualified emoji sequences as entered via the iOS emoji picker.
  '\u231A\uFE0F', // watch
  '\u231B\uFE0F', // hourglass
  '\u25FE\uFE0F', // black medium small square
  '\u2614\uFE0F', // umbrella with rain drops
  '\u2615\uFE0F', // hot beverage
  '\u2648\uFE0F', // Aries
  '\u2649\uFE0F', // Taurus
  '\u264A\uFE0F', // Gemini
  '\u264B\uFE0F', // Cancer
  '\u264C\uFE0F', // Leo
  '\u264D\uFE0F', // Virgo
  '\u264E\uFE0F', // Libra
  '\u264F\uFE0F', // Scorpius
  '\u2650\uFE0F', // Sagittarius
  '\u2651\uFE0F', // Capricorn
  '\u2652\uFE0F', // Aquarius
  '\u2653\uFE0F', // Pisces
  '\u267F\uFE0F', // wheelchair symbol
  '\u26AA\uFE0F', // medium white circle
  '\u26BD\uFE0F', // soccer ball
  '\u26BE\uFE0F', // baseball
  '\u26C4\uFE0F', // snowman without snow
  '\u26F2\uFE0F', // fountain
  '\u26F3\uFE0F', // flag in hole
  '\u26F5\uFE0F', // sailboat
  '\u26FA\uFE0F', // tent
  '\u2757\uFE0F', // heavy exclamation mark symbol
  '\u2B1B\uFE0F', // black large square
  '\u2B1C\uFE0F', // white large square
  '\u2B55\uFE0F', // heavy large circle
  '\u{1F004}\uFE0F', // mahjong tile red dragon
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
