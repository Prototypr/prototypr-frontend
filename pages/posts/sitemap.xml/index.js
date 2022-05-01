import { getAllPostsForSitemap } from "@/lib/api";
import { getServerSideSitemapIndex } from 'next-sitemap'


export const getServerSideProps = async (ctx) => {
    // Method to source urls from cms
    // const urls = await fetch('https//example.com/api')
    const first12Posts = await getAllPostsForSitemap("article", 1);
    let pageCount = first12Posts.posts?.meta?.pagination?.pageCount 

    let siteMapUrls=[]
    if(pageCount){
        for(var page =1;page<pageCount;page++){
            siteMapUrls.push(`https://prototypr.io/posts/sitemap/${page}.xml`)
        }
    }
    return getServerSideSitemapIndex(ctx, siteMapUrls)
  }
  
  // Default export to prevent next.js errors
  export default function SitemapIndex() {}