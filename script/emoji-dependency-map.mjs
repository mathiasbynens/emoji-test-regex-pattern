import fs from 'node:fs/promises';

const getEmojiDependencyMap = async () => {
  const pkg = JSON.parse(
    await fs.readFile(new URL('../package.json', import.meta.url), 'utf8'),
  );
  const deps = Object.keys(pkg.devDependencies).sort();
  const prefix = 'unicode-emoji-';
  // Mapping from emojiVersion to dependencyName.
  const emojiDeps = new Map();
  for (const dep of deps) {
    if (dep.startsWith(prefix)) {
      const version = dep.replace(prefix, '');
      emojiDeps.set(version, dep);
    }
  }
  return emojiDeps;
};

const emojiDependencyMap = await getEmojiDependencyMap();
export default emojiDependencyMap;
