const fs = require('fs/promises');
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

const emojiDependencyMap = require('./emoji-dependency-map.js');
const getSequences = require('./get-sequences.js');
const generateIndex = require('./generate-index.js');
const generateCssUnicodeRange = require('./generate-css-unicode-range.js');

const writeFile = async (fileName, contents) => {
  await fs.writeFile(fileName, contents);
};

const generateFiles = async ({ version, packageName }) => {
  const directory = `./dist/emoji-${version}`;
  await fs.mkdir(directory, { recursive: true });

  const sequences = getSequences(packageName);

  {
    const sorted = [...sequences].sort();
    const index = generateIndex(sorted);
    await writeFile(`./dist/emoji-${version}/index.txt`, index);

    const indexStrings = sorted.join('\n');
    await writeFile(`./dist/emoji-${version}/index-strings.txt`, indexStrings);
  }

  {
    const cssUnicodeRange = generateCssUnicodeRange(sequences);
    const output = `${cssUnicodeRange}\n`;
    await writeFile(`./dist/emoji-${version}/css.txt`, output);
  }

  {
    await execFile('./build-regexp', [
      '--infile', `./dist/emoji-${version}/index-strings.txt`,
      '--preset', 'java',
      '--outfile', `./dist/emoji-${version}/java.txt`,
      '--overwrite',
    ]);
  }

  {
    await execFile('./build-regexp', [
      '--infile', `./dist/emoji-${version}/index-strings.txt`,
      '--preset', 'javascript',
      '--outfile', `./dist/emoji-${version}/javascript.txt`,
      '--overwrite',
    ]);
  }

  {
    await execFile('./build-regexp', [
      '--infile', `./dist/emoji-${version}/index-strings.txt`,
      '--preset', 'javascript',
      '--flags', 'u',
      '--outfile', `./dist/emoji-${version}/javascript-u.txt`,
      '--overwrite',
    ]);
  }

  {
    await execFile('./build-regexp', [
      '--infile', `./dist/emoji-${version}/index-strings.txt`,
      '--preset', 're2',
      '--outfile', `./dist/emoji-${version}/cpp-re2.txt`,
      '--overwrite',
    ]);
  }
};

const main = async () => {
  let latestVersion = '';
  for (const [version, packageName] of emojiDependencyMap) {
    await generateFiles({ version, packageName });
    latestVersion = version;
  }
  await fs.cp(`./dist/emoji-${latestVersion}/`, `./dist/latest/`, { recursive: true });
};

main();
