const getEmojiDependencyMap = () => {
	const pkg = require('../package.json');
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

const emojiDependencyMap = getEmojiDependencyMap();
module.exports = emojiDependencyMap;
