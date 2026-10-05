// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const { allExtensions } = require('eslint-config-expo/flat/utils/extensions');

const assetExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    settings: {
      // eslint-config-expo only registers JS/TS extensions, so static asset
      // imports (e.g. the brand logo) are reported as unresolved.
      'import/extensions': [...allExtensions, ...assetExtensions],
      'import/resolver': {
        node: { extensions: [...allExtensions, ...assetExtensions] },
        typescript: {
          extensions: [...allExtensions, ...assetExtensions],
        },
      },
    },
  },
]);