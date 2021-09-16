// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const config = {
  pageExtensions: ['page.tsx', 'api.ts'],
}

module.exports = withBundleAnalyzer(config)
