// This file sets a custom webpack configuration to use your Next.js app
import path from "path";
import { withPlausibleProxy } from "next-plausible";
import { fileURLToPath } from "url";
import redirects from "./next-config/redirects.js";
import imageDomains from "./next-config/imageDomains.js";
import prototyprPackageNamesModule from "./next-config/prototypr_package_names.js";

const { prototyprPackageNames } = prototyprPackageNamesModule;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = withPlausibleProxy({
  customDomain: "https://analytics.prototypr.io",
  domain: "prototypr.io",
  selfHosted: true,
})({
  reactStrictMode: false,
  // transpilePackages: ['tiptypr'],
  i18n: {
    locales: ["en-US", "es-ES"],
    defaultLocale: "en-US",
  },
  async redirects() {
    // Get the redirects from the config file
    const configRedirects = redirects;
    // Add any additional redirects here
    const additionalRedirects = [];

    // Combine the redirects from the config file and additional redirects
    return [...configRedirects, ...additionalRedirects];
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.tls = false;
      config.resolve.fallback.dns = false;
    }

    // Add source aliasing for development mode
    if (options.dev && process.env.USE_SRC_ALIAS === "true") {
      // Add source aliasing for development mode for all prototypr packages
      prototyprPackageNames.forEach(packageName => {
        if (packageName.startsWith("@prototypr/")) {
          const packageNameWithoutScope = packageName.replace(
            "@prototypr/",
            ""
          );
          config.resolve.alias[packageName] = path.resolve(
            __dirname,
            `./prototypr-packages/${packageNameWithoutScope}/src`
          );
        } else {
          config.resolve.alias[packageName] = path.resolve(
            __dirname,
            `./prototypr-packages/${packageName}/src`
          );
        }
        // Note: 'react-kofi' is not handled here as it's likely an external package
      });
    }

    if (typeof config.webpack === "function") {
      return config.webpack(config, options);
    }
    return config;
  },
  // https://twitter.com/dan_abramov/status/1529677207869825024
  experimental: {
    scrollRestoration: true,
  },
  // assetPrefix: isProd ? 'https://prototyprio.gumlet.io' : undefined,
  // assetPrefix: 'https://prototyprio.gumlet.io',
  images: {
    loader: "custom",
    loaderFile: "./lib/imageloader.js",
    domains: [...imageDomains],
  },
  //cache https://focusreactive.com/configure-cdn-caching-for-self-hosted-next-js-websites/#:~:text=Configuring%20Cloudflare%20CDN%20for%20the%20Next.&text=To%20configure%20HTML%20page%20caching,)%2C%20and%20Edge%20TTL%20section.
  async headers() {
    if (process.env.NODE_ENV !== "production") {
      return [];
    }
    return [
      {
        source: "/:all*(css|js|gif|svg|jpg|jpeg|png|woff|woff2)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000",
          },
        ],
      },
    ];
  },
  // generation before timing out
  staticPageGenerationTimeout: 300000,
});

export default nextConfig;