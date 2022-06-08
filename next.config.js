// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// })
const { withPlausibleProxy } = require("next-plausible");

module.exports =
  //  withBundleAnalyzer(
  withPlausibleProxy({
    customDomain: "https://analytics.prototypr.io",
    domain: "4.prototypr.io",
    selfHosted: true,
  })({
    i18n: {
      locales: ["en-US", "es-ES"],
      defaultLocale: "en-US",
    },
    async redirects() {
      return [
        {
          source: "/home",
          destination: "/",
          permanent: true,
        },
        {
          source: "/prototyping-tools",
          destination: "/toolbox",
          permanent: true,
        },
        {
          source: '/post/:slug(\announcing-prototypr-grant-for-the-web-flagship-project-%F0%9F%8E%89\)',
          destination:
            "/post/announcing-prototypr-grant-for-the-web-flagship-project-f09f8e89",
          permanent: true,
        },
        {
          source: '/prototyping-tool/:slug*',
          destination: '/toolbox/:slug*', // Matched parameters can be used in the destination
          permanent: true,
        },
      ];
    },
    // https://twitter.com/dan_abramov/status/1529677207869825024
    experimental: {
      plugins: true,
      scrollRestoration: true,
      legacyBrowsers: false,
      browsersListForSwc: true,
    },
    images: {
      domains: [
        "localhost",
        "www.iconshock.com",
        "letter-so.s3.amazonaws.com",
        "s3-us-west-1.amazonaws.com",
        "s3.amazonaws.com",
        "prototypr-media.sfo2.digitaloceanspaces.com",
        "wp.prototypr.io",
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
        "claritee.io",
      ],
    },
  });
