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
    additionalPaths: async (config) => {
      const result = []
    
      // all possible values
      result.push({
        loc: '/toolbox',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })
      result.push({
        loc: '/toolbox/augmented-reality-tools',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })
      result.push({
        loc: '/toolbox/conversational-design-tools',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })
      result.push({
        loc: '/toolbox/ux-tools',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })
      result.push({
        loc: '/prototyping',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })
      result.push({
        loc: '/newsletter',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })
      result.push({
        loc: '/posts',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })
  
      // using transformation from the current configuration
      // result.push(await config.transform(config, '/additional-page-3'))
  
      return result
    },
    // ...other options
  }