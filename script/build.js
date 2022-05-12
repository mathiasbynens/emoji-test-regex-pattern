const fs = require('fs/promises');
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

const emojiDependencyMap = require('./emoji-dependency-map.js');
const generateCssUnicodeRange = require('./generate-css-unicode-range.js');
const generateIndex = require('./generate-index.js');
const generateIndexStrings = require('./generate-index-strings.js');
const getSequences = require('./get-sequences.js');
const LCD_RGI_Emoji = require('./get-lcd-rgi-emoji.js');

const writeFile = async (fileName, contents) => {
  await fs.writeFile(fileName, contents);
};

const generateFiles = async ({ version, packageName }) => {
  const directory = `./dist/emoji-${version}`;
  await fs.mkdir(directory, { recursive: true });
  const tmpDirectory = `./tmp/emoji-${version}`;
  await fs.mkdir(tmpDirectory, { recursive: true });

  const INDEX_STRINGS_PATH = `./dist/emoji-${version}/index-strings.txt`;
  const NON_RGI_INDEX_STRINGS_PATH = `./tmp/emoji-${version}/non-lcd-rgi-index-strings.txt`;

  const sequences = getSequences(packageName);

  {
    const sorted = [...sequences].sort();
    const index = generateIndex(sorted);
    await writeFile(`./dist/emoji-${version}/index.txt`, index);

    const indexStrings = generateIndexStrings(sorted);
    await writeFile(INDEX_STRINGS_PATH, indexStrings);

    const nonRgiSequences = sorted.filter(sequence => {
      return !LCD_RGI_Emoji.has(sequence);
    });
    const nonRgiIndexStrings = generateIndexStrings(nonRgiSequences);
    await writeFile(NON_RGI_INDEX_STRINGS_PATH, nonRgiIndexStrings);
  }

  {
    const cssUnicodeRange = generateCssUnicodeRange(sequences);
    const output = `${cssUnicodeRange}\n`;
    await writeFile(`./dist/emoji-${version}/css.txt`, output);
  }

  await execFile('./build-regexp', [
    '--infile', INDEX_STRINGS_PATH,
    '--preset', 'java',
    '--outfile', `./dist/emoji-${version}/java.txt`,
    '--standalone',
    '--overwrite',
  ]);

  await execFile('./build-regexp', [
    '--infile', INDEX_STRINGS_PATH,
    '--preset', 'javascript',
    '--outfile', `./dist/emoji-${version}/javascript.txt`,
    '--standalone',
    '--overwrite',
  ]);

  await execFile('./build-regexp', [
    '--infile', INDEX_STRINGS_PATH,
    '--preset', 'javascript',
    '--flags', 'u',
    '--outfile', `./dist/emoji-${version}/javascript-u.txt`,
    '--standalone',
    '--overwrite',
  ]);

  {
    const nonRgiPatternPath = `./tmp/emoji-${version}/javascript-v-non-rgi-part.txt`;
    await execFile('./build-regexp', [
      '--infile', NON_RGI_INDEX_STRINGS_PATH,
      '--preset', 'javascript',
      '--flags', 'u',
      '--outfile', nonRgiPatternPath,
      '--standalone',
      '--overwrite',
    ]);

    const contents = await fs.readFile(nonRgiPatternPath, 'utf8');
    const output = `\\p{RGI_Emoji}|${contents}`;
    writeFile(`./dist/emoji-${version}/javascript-v.txt`, output);
  }

  await execFile('./build-regexp', [
    '--infile', INDEX_STRINGS_PATH,
    '--preset', 're2',
    '--outfile', `./dist/emoji-${version}/cpp-re2.txt`,
    '--standalone',
    '--overwrite',
  ]);
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
