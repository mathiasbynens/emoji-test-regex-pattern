// Verify the latest JS pattern matches every emoji sequence in its
// entirety.

const assert = require('assert');
const fs = require('fs');

const getLatestSequences = () => {
  const dependencyMap = require('../script/emoji-dependency-map.js');
  const getSequences = require('../script/get-sequences.js');
  let latest = '';
  for (const pkgId of dependencyMap.values()) {
    if (pkgId > latest) {
      latest = pkgId;
    }
  }
  const sequences = getSequences(latest);
  return sequences;
};

const pattern = fs.readFileSync('./dist/latest/javascript.txt')
  .toString()
  .trim();
const re = new RegExp(pattern);
console.log(re)

const sequences = getLatestSequences();
for (const string of sequences) {
  const actual = string.match(re)[0];
  assert(string === actual);
}
