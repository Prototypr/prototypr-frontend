/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: 'https://prototypr.io',
    generateRobotsTxt: true, // (optional)
    sitemapSize: 7000,
    exclude: ['/server-sitemap-index.xml', '/sitemap-tools.xml'], // <= exclude here
    robotsTxtOptions: {
        additionalSitemaps: [
        'https://example.com/server-sitemap-index.xml', // <==== Add here,
        'https://example.com/sitemap-tools.xml', // <==== Add here,
        ],
    },
    // ...other options
  }