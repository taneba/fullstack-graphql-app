import { defineConfig, Options } from 'tsup'

const env = process.env.NODE_ENV

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ['src/**/*.ts'],
  format: ['esm'],
  dts: true,
  minify: env === 'production',
  clean: true,
  ...options,
}))
