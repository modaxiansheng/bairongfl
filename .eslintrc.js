module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/valid-template-root': 'off',
    'generator-star-spacing': 'off',
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "vue/jsx-uses-vars": 2,
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    "max-len" : ["error", {code : 300}],
    "no-empty": ["error", { "allowEmptyCatch": true }],

  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
