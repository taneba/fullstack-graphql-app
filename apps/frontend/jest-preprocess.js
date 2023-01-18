const babelOptions = {
  presets: ['@babel/preset-typescript'],
  // plugins: ['babel-plugin-macros'],
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require('babel-jest').default.createTransformer(babelOptions)
