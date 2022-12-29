import RSS from 'rss';
import fs from 'fs';
const path = require('path');

export default async function generateJobsRSS(allPosts) {
 const site_url = process.env.NEXT_PUBLIC_HOME_URL;

 const feedOptions = {
  title: 'Design jobs | RSS Feed',
  description: 'Latest design jobs on Prototypr!',
  site_url: site_url,
  feed_url: `${site_url}/rss/jobs.xml`,
  image_url: `${site_url}/static/images/logo-small.svg`,
  pubDate: new Date(),
  copyright: `All rights reserved ${new Date().getFullYear()}, Prototypr`,
 };


 const feed = new RSS(feedOptions);
 allPosts?.length ? allPosts.map((post) => {
   
    feed.item({
     title: post?.title,
     description: `${post?.title} at ${post.compantName}. Salary range: ${post.salaryText}. Job type: ${post.jobType}`,
     url: `${site_url}/job/${post?.id}`,
     date: post.date,
     enclosure:{
        url:post.companyLogo,
        'type' : 'image/png'
     }
    });
   }):''
   const fullFilePath = path.join(process.cwd(), 'public/rss', 'jobs.xml')
    // remove the old file
    if (fs.existsSync(fullFilePath)) {
      await fs.promises.unlink(fullFilePath)
   }
   fs.writeFileSync(fullFilePath, feed.xml({ indent: true }));

}