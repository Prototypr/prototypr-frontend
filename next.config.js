const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  i18n: {
    locales: ['en-US', 'es-ES'],
    defaultLocale: 'en-US',
  },
  images: {
    domains: [
      "localhost",
      "www.iconshock.com",
      "letter-so.s3.amazonaws.com",
      "s3-us-west-1.amazonaws.com",
      "s3.amazonaws.com",
      "prototypr-media.sfo2.digitaloceanspaces.com",
      "prototypr.io",
      "prototypr.gumlet.io",
      "prototyprio.gumlet.io",
      "prototypr.gumlet.com",
      "miro.medium.com",
      "secure.gravatar.com",
      "cdn-images-1.medium.com",
      "www.prototypr.io",
      "cdn.dribbble.com",
      "secure.gravatar.com",
      "cdn-images-1.medium.com",
      "claritee.io"
    ],
  },
});
