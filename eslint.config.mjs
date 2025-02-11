import globals from "globals";
import pluginJs from "@eslint/js";
import pluginImport from "eslint-plugin-import";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      import: pluginImport,
      prettier: pluginPrettier,
    },
    rules: {
      quotes: ["error", "single"],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "object-curly-spacing": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "arrow-parens": ["error", "always"],
      "max-len": ["error", { code: 100 }],
      "no-use-before-define": "error",
      "consistent-return": "error",
      "prefer-destructuring": "error",
      "no-undef": "error",

      "import/extensions": ["error", "never"],
      "import/prefer-default-export": "error",
      "import/order": "error",
      "import/no-duplicates": "error",

      "prettier/prettier": "error",
    },
  },
  configPrettier,
];
