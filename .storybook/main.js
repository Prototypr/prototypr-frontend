// const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const path = require('path');

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],

  staticDirs: [
    "../public/",
    // "../static",
    // { from: "/static", to: "../public" },
  ],

  typescript: { reactDocgen: false },

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      /**
       * https://theodorusclarence.com/blog/nextjs-storybook-tailwind
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],

  webpackFinal: async (config) => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, '..', ''),
    };

    return config;
  },

  "framework": {
    name: "@storybook/nextjs",
    options: {}
  },

  docs: {
    autodocs: true
  }
}