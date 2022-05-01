/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: 'https://prototypr.io',
    generateRobotsTxt: true, // (optional)
    sitemapSize: 5000,
    exclude: ['/server-sitemap-index.xml', '/sitemap-tools.xml',
    '/account', '/account/*',
     '/posts/sitemap.xml', '/posts/sitemap/*',
     '/toolbox/sitemap.xml', '/toolbox/sitemap/*',
     '/newsletter/sitemap.xml', '/newsletter/sitemap/*',
     '/news/sitemap.xml', '/news/sitemap/*',
     '/blog/sitemap.xml', '/blog/sitemap/*',
     '/inspiration/sitemap.xml', '/inspiration/sitemap/*',
  ], // <= exclude here
    robotsTxtOptions: {
        additionalSitemaps: [
        'https://prototypr.io/posts/sitemap.xml', // <==== Add here,
        'https://prototypr.io/toolbox/sitemap.xml', // <==== Add here,
        'https://prototypr.io/newsletter/sitemap.xml', // <==== Add here,
        'https://prototypr.io/news/sitemap.xml', // <==== Add here,
        'https://prototypr.io/blog/sitemap.xml', // <==== Add here,
        'https://prototypr.io/inspiration/sitemap.xml', // <==== Add here,
        ],
    },
    // ...other options
  }