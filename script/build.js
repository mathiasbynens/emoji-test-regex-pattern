const fs = require('fs');

const Trie = require('regexgen').Trie;

const emojiDependencyMap = require('./emoji-dependency-map.js');
const getSequences = require('./get-sequences.js');

const writeFile = (fileName, contents) => {
  // Since the output is guaranteed to be ASCII-safe, its `.length`
  // accurately reflects the number of bytes in the file.
  const fileSize = contents.length;
  console.log(`${fileName}\t${fileSize} bytes`);
  fs.writeFileSync(fileName, contents);
};

const latestOutput = {
  java: '',
  javascript: '',
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
    const pattern = trie.toString();
    const output = `${pattern}\n`;
    latestOutput.javascript = output;
    writeFile(`./dist/emoji-${version}/javascript.txt`, output);
  }

  {
    const pattern = trie.toString('u');
    // TODO: Use replaceAll once it lands in Node.js.
    const output = `${
      pattern
        .replace(/\\u\{/g, '\\x{')
        .replace(/\\u([a-fA-F0-9]{4})/g, '\\x{$1}')
    }\n`;
    latestOutput.java = output;
    writeFile(`./dist/emoji-${version}/java.txt`, output);
  }

}
writeFile(`./dist/latest/java.txt`, latestOutput.java);
writeFile(`./dist/latest/javascript.txt`, latestOutput.javascript);
