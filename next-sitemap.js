/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: 'https://prototypr.io',
    generateRobotsTxt: true, // (optional)
    sitemapSize: 5000,
    exclude: ['/server-sitemap-index.xml', '/sitemap-tools.xml'], // <= exclude here
    robotsTxtOptions: {
        additionalSitemaps: [
        'https://prototypr.io/server-sitemap-index.xml', // <==== Add here,
        'https://prototypr.io/sitemap-tools.xml', // <==== Add here,
        ],
    },
    // ...other options
  }