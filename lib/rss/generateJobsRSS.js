import RSS from 'rss';
import fs from 'fs';

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

   fs.writeFileSync('./public/rss/jobs.xml', feed.xml({ indent: true }), { flag: 'wx' });

}