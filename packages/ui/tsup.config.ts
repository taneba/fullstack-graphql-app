import { defineConfig, Options } from 'tsup'

const env = process.env.NODE_ENV

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ['src/**/*.tsx'],
  format: ['esm'],
  dts: true,
  minify: env === 'production',
  clean: true,
  external: ['react', 'react-dom'],
  ...options,
}))
