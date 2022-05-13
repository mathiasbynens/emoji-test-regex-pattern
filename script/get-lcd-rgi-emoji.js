// For our purposes, `RGI_Emoji` is hardcoded at a specific
// Unicode/Emoji version based on the lowest common denominator in
// terms of what browsers support. We hardcode `\p{RGI_Emoji}` into
// the `javascript-v` output, and use this versioned snapshot to
// figure out which newer/other emoji strings we need to hardcode
// into the pattern.
const RGI_Emoji = require(`unicode-emoji-13.0/Sequence_Property/RGI_Emoji/index.js`);
const set = new Set(RGI_Emoji);
module.exports = set;
