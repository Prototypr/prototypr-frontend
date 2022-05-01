import { getServerSideSitemap } from 'next-sitemap'
import { getAllPostsForSitemap } from "@/lib/api";

export const getServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  console.log(ctx.params.pageNo)
  let fields = []

  const first12Posts = await getAllPostsForSitemap("tool", parseInt(ctx.params.pageNo));

  for(var x = 0;x<first12Posts?.posts?.data?.length;x++){
    fields.push({
      loc:'https://prototypr.io/toolbox/'+first12Posts?.posts?.data[x]?.attributes?.slug,
      lastmod: new Date().toISOString(),
    })
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