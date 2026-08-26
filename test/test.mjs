// For every Emoji version, verify that the generated JS pattern matches
// every emoji sequence in its entirety.

import assert from 'node:assert';
import fs from 'node:fs/promises';

import emojiDependencyMap from '../script/emoji-dependency-map.mjs';
import getSequences from '../script/get-sequences.mjs';
import LCD_RGI_Emoji from '../script/get-lcd-rgi-emoji.mjs';

const getPackageIdsToCheck = () => {
  const pkgIds = [];
  for (const pkgId of emojiDependencyMap.values()) {
    pkgIds.push(pkgId);
  }
  return pkgIds;
};

const assertNotEmpty = async (path) => {
  const contents = (await fs.readFile(path, 'utf8')).trim();
  assert(contents.length > 0);
};

const checkPackage = async (pkgId) => {
  console.log(`Checking ${pkgId}…`);
  const prefix = `./dist/${pkgId.replace('unicode-', '')}`;

  {
    const path = `${prefix}/javascript.txt`;
    const pattern = (await fs.readFile(path, 'utf8')).trim();
    const re = new RegExp(pattern);

    const pathU = `${prefix}/javascript-u.txt`;
    const patternU = (await fs.readFile(pathU, 'utf8')).trim();
    const reU = new RegExp(patternU, 'u');

    const sequences = await getSequences(pkgId);
    const sequenceSet = new Set(sequences);

    // Verify each `LCD_RGI_Emoji` is included in each version of
    // emoji-test; otherwise, the `javascript-v` output would become
    // incorrect.
    for (const string of LCD_RGI_Emoji) {
      assert(sequenceSet.has(string), string);
    }

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
  await assertNotEmpty(`${prefix}/javascript-v.txt`);

  await assertNotEmpty(`${prefix}/index.txt`);
  await assertNotEmpty(`${prefix}/cpp-re2.txt`);
  await assertNotEmpty(`${prefix}/css.txt`);
  await assertNotEmpty(`${prefix}/java.txt`);
};

const pkgIds = getPackageIdsToCheck();
for (const pkgId of pkgIds) {
  await checkPackage(pkgId);
}
