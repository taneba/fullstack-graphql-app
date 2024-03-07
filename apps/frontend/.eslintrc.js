/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('config/eslint-next')

module.exports = {
  ...base,
  rules: {
    ...base.rules,
    'react/no-unknown-property': [
      2,
      {
        ignore: ['jsx', 'global'],
      },
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 1,
  },
}
