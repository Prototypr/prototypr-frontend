import RSS from 'rss';
// import fs from 'fs';
// const path = require('path');

export default async function generateToolsRSS(allPosts) {
 const site_url = process.env.NEXT_PUBLIC_HOME_URL;

 const feedOptions = {
  title: 'Notes on Prototypr | RSS Feed',
  description: 'Notes, and ideas on Prototypr!',
  site_url: site_url,
  feed_url: `${site_url}/rss/notes.xml`,
  image_url: `${site_url}/static/images/logo-small.svg`,
  pubDate: new Date(),
  copyright: `All rights reserved ${new Date().getFullYear()}, Prototypr`,
 };

 const feed = new RSS(feedOptions);
 for(var x =0;x<allPosts?.length;x++){
   const post = allPosts[x]
   let coverImage = post.attributes.featuredImage?.data?.attributes?.url
    ? post.attributes.featuredImage?.data?.attributes?.url
    : post.attributes.legacyFeaturedImage?.mediaItemUrl
    ? post.attributes.legacyFeaturedImage.mediaItemUrl
    : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
    
    feed.item({
     title: post?.attributes?.title,
     description: post?.attributes?.excerpt,
     url: `${site_url}/notes/${post?.attributes?.slug}`,
     date: post.date,
     enclosure:{
        url:coverImage,
        'type' : 'image/png'
     }
    });
   }
   return feed
   // const fullFilePath = path.join(process.cwd(), 'public/rss', 'tools.xml')
   // // remove the old file
   // if (fs.existsSync(fullFilePath)) {
   //    await fs.promises.unlink(fullFilePath)
   // }

   // fs.writeFileSync(fullFilePath, feed.xml({ indent: true }));

}