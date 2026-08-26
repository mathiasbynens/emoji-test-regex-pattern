import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// Additional emoji sequences that we want to include in the regular
// expression pattern, even if they’re not (yet) in emoji-test.txt.
// Note that sequences must never be removed from this list, not even
// once they’re added upstream, to ensure that generated output for
// older Emoji versions still includes them.
const EXTRA_SEQUENCES = [
  // The following handshake emoji sequences were officially added in
  // Emoji 14.0.
  '\u{1F91D}\u{1F3FB}', // Handshake: light skin.
  '\u{1F91D}\u{1F3FC}', // Handshake: medium-light skin.
  '\u{1F91D}\u{1F3FD}', // Handshake: medium skin.
  '\u{1F91D}\u{1F3FE}', // Handshake: medium-dark skin.
  '\u{1F91D}\u{1F3FF}', // Handshake: dark skin.

  '\u{1F93C}\u{1F3FB}', // Wrestlers: light skin.
  '\u{1F93C}\u{1F3FC}', // Wrestlers: medium-light skin.
  '\u{1F93C}\u{1F3FD}', // Wrestlers: medium skin.
  '\u{1F93C}\u{1F3FE}', // Wrestlers: medium-dark skin.
  '\u{1F93C}\u{1F3FF}', // Wrestlers: dark skin.

  // Overqualified emoji sequences as entered via the iOS emoji picker.
  '\u231A\uFE0F', // Watch.
  '\u231B\uFE0F', // Hourglass.
  '\u25FE\uFE0F', // Black medium small square.
  '\u2614\uFE0F', // Umbrella with rain drops.
  '\u2615\uFE0F', // Hot beverage.
  '\u2648\uFE0F', // Aries.
  '\u2649\uFE0F', // Taurus.
  '\u264A\uFE0F', // Gemini.
  '\u264B\uFE0F', // Cancer.
  '\u264C\uFE0F', // Leo.
  '\u264D\uFE0F', // Virgo.
  '\u264E\uFE0F', // Libra.
  '\u264F\uFE0F', // Scorpius.
  '\u2650\uFE0F', // Sagittarius.
  '\u2651\uFE0F', // Capricorn.
  '\u2652\uFE0F', // Aquarius.
  '\u2653\uFE0F', // Pisces.
  '\u267F\uFE0F', // Wheelchair symbol.
  '\u26AA\uFE0F', // Medium white circle.
  '\u26BD\uFE0F', // Soccer ball.
  '\u26BE\uFE0F', // Baseball.
  '\u26C4\uFE0F', // Snowman without snow.
  '\u26F2\uFE0F', // Fountain.
  '\u26F3\uFE0F', // Flag in hole.
  '\u26F5\uFE0F', // Sailboat.
  '\u26FA\uFE0F', // Tent.
  '\u2757\uFE0F', // Heavy exclamation mark symbol.
  '\u2B1B\uFE0F', // Black large square.
  '\u2B1C\uFE0F', // White large square.
  '\u2B55\uFE0F', // Heavy large circle.
  '\u{1F004}\uFE0F', // Mahjong tile red dragon.
];

const compare = (a, b) => {
  // TODO: Remove sorting logic once the upstream bug is addressed.
  // https://github.com/devongovett/regexgen/issues/31
  // Longest strings first.
  const aLength = [...a].length;
  const bLength = [...b].length;
  if (aLength > bLength) return -1;
  if (aLength < bLength) return 1;
  // Lengths are equal; sort lexicographically from a-z.
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const getSequences = async (packageName) => {
  let Emoji_Test;
  if (packageName === 'unicode-emoji-13.0') {
    // For `unicode-emoji-13.0` specifically, use old-school `require`.
    Emoji_Test = require(
      `${packageName}/Sequence_Property/Emoji_Test/index.js`,
    );
  } else {
    // The `@unicode/unicode-*` v2 packages export JavaScript modules.
    ({ default: Emoji_Test } = await import(
      `${packageName}/Sequence_Property/Emoji_Test/index.mjs`
    ));
  }
  const sequences = [...Emoji_Test, ...EXTRA_SEQUENCES];
  sequences.sort(compare);
  return sequences;
};

export default getSequences;
