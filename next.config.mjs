// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
// const { withSentryConfig } = require('@sentry/nextjs');

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// })
// const { withPlausibleProxy } = require("next-plausible");

import withPlaiceholder from "@plaiceholder/next";
import { withPlausibleProxy } from "next-plausible";

const nextConfig =
// module.exports =
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
    // modularizeImports: {
    //   "@phosphor-icons/react": {
    //     transform: "@phosphor-icons/react/{{member}}",
    //   },
    // },
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
          source: "/toolbox/zeplin",
          destination: "/toolbox/zeplin-2",
          permanent: true,
        },
        {
          source: "/toolbox/canvas-flip",
          destination: "/toolbox/canvas-for-chrome",
          permanent: true,
        },
        {
          source: "/toolbox/vectary%E2%80%8A-%E2%80%8A3d-design-collaboration",
          destination: "/toolbox/vectarye2808a-e2808a3d-design-collaboration",
          permanent: true,
        },
        {
          source: "/toolbox/siftery%E2%80%8A-%E2%80%8A-product-comparisons",
          destination: "/toolbox/sifterye2808a-e2808a-product-comparisons",
          permanent: true,
        },
        {
          source: "/post/the-ai-companion-who-doesnt-care---lf6ra6yx0c2fgy2pbws",
          destination: "/post/conversational-ai-companion",
          permanent: true,
        },
        {
          source: "/toolbox/gradient-hunt%E2%80%8A-%E2%80%8Abeautiful-color-gradients",
          destination: "/toolbox/gradient-hunte2808a-e2808abeautiful-color-gradients",
          permanent: true,
        },
        {
          source: "/toolbox/%F0%9F%8E%A8-macos-big-sur-icons",
          destination: "/toolbox/f09f8ea8-macos-big-sur-icons",
          permanent: true,
        },
        {
          source: "/toolbox/%E2%80%8Eentity-pro",
          destination: "/toolbox/e2808eentity-pro",
          permanent: true,
        },
        {
          source: "/toolbox/coolhue-2-0%E2%80%8A-%E2%80%8Acoolest-gradient-hues-and-swatches",
          destination: "/toolbox/coolhue-2-0e2808a-e2808acoolest-gradient-hues-and-swatches",
          permanent: true,
        },
        {
          source: "/toolbox/gradient-hunt%E2%80%8A-%E2%80%8Abeautiful-color-gradients",
          destination: "/toolbox/gradient-hunte2808a-e2808abeautiful-color-gradients",
          permanent: true,
        },
        {
          source: "/toolbox/ux-challenges",
          destination: "/post/ux-challenges",
          permanent: true,
        },
        {
          source: "/toolbox/aesthetic%E2%80%89app-icons",
          destination: "/toolbox/aesthetice28089app-icons",
          permanent: true,
        },
        {
          source: "/toolbox/conversational-design-tools",
          destination: "/toolbox/conversational-design-tools/page/1",
          permanent: true,
        },
        {
          source: "/toolbox/ux-tools",
          destination: "/toolbox/ux-tools/page/1",
          permanent: true,
        },
        {
          source: "/toolbox/mmm-page-·-ᴬᴸᴾᴴᴬ",
          destination: "/toolbox/mmm-page-c2b7-e1b4ace1b4b8e1b4bee1b4b4e1b4ac",
          permanent: true,
        },
        {
          source: '/post/:slug(\announcing-prototypr-grant-for-the-web-flagship-project-%F0%9F%8E%89\)',
          destination:
            "/post/announcing-prototypr-grant-for-the-web-flagship-project-f09f8e89",
          permanent: true,
        },
        { source:'/post/microsoft-designer-ai-prompt-design-principles---lbzz9kvwx9e13fo5rj',
          destination:'/post/microsoft-designer-ai-prompt-design-principles',
          permanent:true
        },
        {
          source: '/prototyping-tool/:slug*',
          destination: '/toolbox/:slug*', // Matched parameters can be used in the destination
          permanent: true,
        },
        {
          source: '/p',
          destination: '/dashboard/drafts',
          permanent: true,
        },
        {
          source: '/dashboard',
          destination: '/dashboard/drafts',
          permanent: true,
        },
      ];
    },
    webpack: (config, options) => {
      if (!options.isServer) {
        //letter addition - graeme graylien change
        config.resolve.fallback.fs=false
        config.resolve.fallback.net=false
        config.resolve.fallback.tls=false
        config.resolve.fallback.dns=false
      }

      if (typeof config.webpack === "function") {
        return config.webpack(config, options);
      }
      return config;
    },
    // https://twitter.com/dan_abramov/status/1529677207869825024
    experimental: {
      plugins: true,
      scrollRestoration: true,
      legacyBrowsers: false,
      browsersListForSwc: true,
      // optimizePackageImports: ['@phosphor-icons/react']
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
        "sfo2.digitaloceanspaces.com",
      ],
    },
      // generation before timing out
  staticPageGenerationTimeout: 300000,
  });

// module.exports = withSentryConfig(
  // module.exports,
  // { silent: true },
  // { hideSourcemaps: true }
// );

export default withPlaiceholder(nextConfig)