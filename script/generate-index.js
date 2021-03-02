const createFragment = (emoji, id) => {
  const output = `${id} → ${emoji}`;
  return output;
};

const generateIndex = (strings) => {
  const buf = [];
  for (const string of strings) {
    const tmp = [];
    for (const ch of string) {
      const codePoint = ch.codePointAt(0);
      const hex = `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;
      tmp.push(hex);
    }
    const id = tmp.join(' ');
    buf.push(createFragment(string, id));
  }
  const output = buf.join('\n') + '\n';
  return output;
};

module.exports = generateIndex;
