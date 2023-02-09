// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const config = {
  pageExtensions: ['page.tsx', 'api.ts'],
  // transpilePackages: ['validation-schema'],
}

module.exports = withBundleAnalyzer(config)
