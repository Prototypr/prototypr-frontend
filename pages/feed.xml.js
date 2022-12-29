/**
 * https://guillermodlpa.com/blog/how-to-generate-rss-feed-with-next-js
 * 
 * This is a dynamic RSS feed rendered on the server with all blog posts
 * We use SSG with a cache of a few minutes instead of statically generating the file because we want
 * new blog posts and edits to automatically show up here
 */

import generateCombinedRSS from "@/lib/rss/generateAllRSS";
import { getAllToolsForHome, getCombinedPostsForHome } from "@/lib/api";
const PAGE_SIZE = 12;

export const getServerSideProps = async (ctx) => {
    let sort = ["featured:desc", "tier:asc", "date:desc"];

    let allPosts = (await getCombinedPostsForHome(null, 8, 0, sort)) || [];
    let allTools =
    (await getAllToolsForHome(null, PAGE_SIZE, 0, ["date:desc"])) || [];

    // allPosts = transformPostListOld(allPosts.data, locale);
    // allTools = transformPostListOld(allTools.data, locale);

   const feed = await generateCombinedRSS({allPosts:allPosts?.data,allTools:allTools?.data })
    
  const cacheMaxAgeUntilStaleSeconds = 60 * 60; // 1 minute
  const cacheMaxAgeStaleDataReturnSeconds = 60 * 60 * 60; // 60 minutes
  ctx.res.setHeader(
    "Cache-Control",
    `public, s-maxage=${cacheMaxAgeUntilStaleSeconds}, stale-while-revalidate=${cacheMaxAgeStaleDataReturnSeconds}`
  );

  ctx.res.setHeader("Content-Type", "text/xml");
  ctx.res.write(feed.xml());
  ctx.res.end();

  return { props: {} };
};

// Default export to prevent next.js errors
export default function RssPage() {}