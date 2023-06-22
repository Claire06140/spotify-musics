module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    "sourceType": "module",
    "ecmaVersion": 2021,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": "off",
    "semi": "off",
    "max-len": ["error", {"code": 120}],
    "import/no-unresolved": "off", // Ajoutez cette règle,
    "camelcase": ["error", {
      "properties": "never",
      "ignoreDestructuring": true,
      "ignoreImports": true,
      "allow": ["access_token", "refresh_token"],
    }],
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
