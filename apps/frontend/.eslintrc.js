/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('config/exlint-next')

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
  },
}
