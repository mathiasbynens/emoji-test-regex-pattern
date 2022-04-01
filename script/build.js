const fs = require('fs');

const Trie = require('regexgen').Trie;

const emojiDependencyMap = require('./emoji-dependency-map.js');
const getSequences = require('./get-sequences.js');
const generateIndex = require('./generate-index.js');
const generateCssUnicodeRange = require('./generate-css-unicode-range.js');

const writeFile = (fileName, contents) => {
  const fileSize = contents.length;
  // Since except for `index.txt` the output is guaranteed to be
  // ASCII-safe, the `.length` accurately reflects the number of bytes
  // in the file.
  if (fileName.endsWith('index.txt')) {
    console.log(`${fileName}`);
  } else {
    console.log(`${fileName}\t${fileSize} bytes`);
  }
  fs.writeFileSync(fileName, contents);
};

const latestOutput = {
  index: '',
  css: '',
  strings: '',
};
for (const [version, packageName] of emojiDependencyMap) {
  const directory = `./dist/emoji-${version}`;
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  const sequences = getSequences(packageName);
  const trie = new Trie();
  trie.addAll(sequences);

  {
    const strings = sequences.join('\n');
    latestOutput.strings = strings;
    writeFile(`./dist/emoji-${version}/strings.txt`, strings);
  }

  {
    const sorted = [...sequences].sort();
    const index = generateIndex(sorted);
    latestOutput.index = index;
    writeFile(`./dist/emoji-${version}/index.txt`, index);
  }

  {
    const cssUnicodeRange = generateCssUnicodeRange(sequences);
    const output = `${cssUnicodeRange}\n`;
    latestOutput.css = output;
    writeFile(`./dist/emoji-${version}/css.txt`, output);
  }

}

writeFile(`./dist/latest/index.txt`, latestOutput.index);
writeFile(`./dist/latest/css.txt`, latestOutput.css);
writeFile(`./dist/latest/strings.txt`, latestOutput.strings);
