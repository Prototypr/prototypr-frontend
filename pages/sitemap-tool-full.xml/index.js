import { getServerSideSitemap } from 'next-sitemap'
import { getAllPostsForSitemap } from "@/lib/api";

export const getServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  console.log(ctx.params)
  let fields = []

  const first12Posts = await getAllPostsForSitemap("tool", 1);

  for(var x = 0;x<first12Posts?.posts?.data?.length;x++){
    fields.push({
      loc:first12Posts?.posts?.data[x]?.attributes?.slug,
      lastmod: new Date().toISOString(),
    })
  }

  let pageCount = first12Posts.posts?.meta?.pagination?.pageCount 

  if(pageCount){
    for(var page =2;page<pageCount;page++){
      console.log(page)
      const next12 = await getAllPostsForSitemap("tool", page);
      for(var y = 0;y<next12?.posts?.data?.length;y++){
        fields.push({
          loc:next12?.posts?.data[y]?.attributes?.slug,
          lastmod: new Date().toISOString(),
        })
      }
    }
  }

  // const fields = [
  //   {
  //     loc: 'https://example.com', // Absolute url
  //     lastmod: new Date().toISOString(),
  //     // changefreq
  //     // priority
  //   },
  //   {
  //     loc: 'https://example.com/dynamic-path-2', // Absolute url
  //     lastmod: new Date().toISOString(),
  //     // changefreq
  //     // priority
  //   },
  // ]

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}