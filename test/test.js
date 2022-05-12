// For every Emoji version, verify that the generated JS pattern matches
// every emoji sequence in its entirety.

const assert = require('assert');
const fs = require('fs');

const getSequences = require('../script/get-sequences.js');

const getPackageIdsToCheck = () => {
  const dependencyMap = require('../script/emoji-dependency-map.js');
  const pkgIds = [];
  for (const pkgId of dependencyMap.values()) {
    pkgIds.push(pkgId);
  }
  return pkgIds;
};

const assertNotEmpty = (path) => {
  const contents = fs.readFileSync(path).toString().trim();
  assert(contents.length > 0);
};

const checkPackage = (pkgId) => {
  console.log(`Checking ${pkgId}…`);
  const prefix = `./dist/${pkgId.replace('unicode-', '')}`;

  {
    const path = `${prefix}/javascript.txt`;
    const pattern = fs.readFileSync(path).toString().trim();
    const re = new RegExp(pattern);

    const pathU = `${prefix}/javascript-u.txt`;
    const patternU = fs.readFileSync(pathU).toString().trim();
    const reU = new RegExp(patternU, 'u');

    const sequences = getSequences(pkgId);
    for (const string of sequences) {
      const actual = string.match(re)[0];
      assert(string === actual);

      const actualU = string.match(reU)[0];
      assert(string === actualU);
    }
  }

  // TODO: Change this assertion into a proper test once the `v` flag
  // is supported in V8 & Node.js.
  // https://bugs.chromium.org/p/v8/issues/detail?id=11935
  assertNotEmpty(`${prefix}/javascript-v.txt`);

  assertNotEmpty(`${prefix}/index.txt`);
  assertNotEmpty(`${prefix}/cpp-re2.txt`);
  assertNotEmpty(`${prefix}/css.txt`);
  assertNotEmpty(`${prefix}/java.txt`);
};

const pkgIds = getPackageIdsToCheck();
for (const pkgId of pkgIds) {
  checkPackage(pkgId);
}
