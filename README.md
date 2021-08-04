# emoji-test-regex-pattern [![emoji-test-regex-pattern on npm](https://img.shields.io/npm/v/emoji-test-regex-pattern)](https://www.npmjs.com/package/emoji-test-regex-pattern)

_emoji-test-regex-pattern_ offers Java- and JavaScript-compatible regular expression patterns to match all emoji symbols and sequences listed in the `emoji-test.txt` file provided as part of [Unicode® Technical Standard #51](https://www.unicode.org/reports/tr51/).

These patterns can then be embedded into source code as part of projects such as [emoji-regex](https://github.com/mathiasbynens/emoji-regex).

This repository contains a script that generates this regular expression pattern based on [Unicode data](https://github.com/node-unicode/node-unicode-data). Because of this, the pattern can easily be updated whenever new emoji are added to the Unicode standard.

Note that although Unicode Emoji UTS#51 follows the versioning system used by the Unicode Standard, [the version numbers can be different](https://www.unicode.org/reports/tr51/#EmojiVersions). For example, when Unicode 13.0 was released, so was Emoji 13.0. But later, Emoji 13.1 was published while the Unicode version number remained at 13.0. Therefore, we use the Emoji version as specified in UTS#51 (and not the version of the Unicode Standard itself) to version the different patterns:

```
dist/emoji-13.0/index.txt
dist/emoji-13.0/java.txt
dist/emoji-13.0/javascript.txt
dist/emoji-13.1/index.txt
dist/emoji-13.1/java.txt
dist/emoji-13.1/javascript.txt
dist/emoji-14.0/index.txt
dist/emoji-14.0/java.txt
dist/emoji-14.0/javascript.txt
dist/latest/index.txt
dist/latest/java.txt
dist/latest/javascript.txt
```

See [the `dist/` folder](https://github.com/mathiasbynens/emoji-test-regex-pattern/tree/main/dist).

## For maintainers

### How to update _emoji-test-regex-pattern_ after new UTS#51 releases

1. Update the Unicode data dependency in `package.json` by running the following commands:

    ```sh
    # Example: Emoji 15.0 (UTS#51) is released, and its data is included in the @unicode/unicode-15.0.0 package.
    npm install unicode-emoji-15.0@npm:@unicode/unicode-15.0.0@latest --save-dev
    ````

1. Generate the new output:

    ```sh
    npm run build
    ```

1. Verify that `dist` contains the new file.

1. Send a pull request with the changes, and get it reviewed & merged.

1. On the `main` branch, bump the version number in `package.json`:

    ```sh
    npm version patch -m 'Release v%s'
    ```

    Instead of `patch`, use `minor` or `major` [as needed](https://semver.org/).

    Note that this produces a Git commit + tag.

1. Push the release commit and tag:

    ```sh
    git push && git push --tags
    ```

    Our CI then automatically publishes the new release to npm.

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

This project is a fork of [_emoji-regex_](https://github.com/mathiasbynens/emoji-regex), with a different goal. _emoji-test-regex-pattern_ is available under the same [MIT](https://mths.be/mit) license as the original project.
