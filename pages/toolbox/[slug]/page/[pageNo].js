import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import NewPagination from '@/components/pagination'
import FilterCategory from '@/components/FilterCategory'

// import { getAllPostsForToolsPage, getPostsByPageForToolsPage } from '@/lib/api'
import { getAllPostsForToolsSubcategoryPage, getPostsByPageForToolsSubcategoryPage } from '@/lib/api'
import Link from 'next/link'
const PAGE_SIZE = 12;
const ALL_SLUGS = [{
    key: "analysis",
    name: "User Analysis",
    tags: ["testing", "analytics", "user-analytics", "interview", "persona"]
},{
    key: "journey",
    name: "User Journey",
    tags: ["journey", "journey-map", "user-flow"]
},{
    key: "research",
    name: "User Research",
    tags: ["exploration", "research", "user-research"]
}]



export default function ToolboxPage({allPosts = [], preview, pagination,slug}) {
    //pagination is like {"total":48,"pageSize":13,"page":1,"pageCount":4}
    const router = useRouter()

    const [selectedFilter, setSelectedFilter] = useState("")
    const onPageNumChange = (pageNo) => {
        router.push({
            pathname:`/toolbox/[slug]/page/${pageNo}`,
            query: {
                slug
            }
        })
      }

    return (
        <Layout activeNav={'toolbox'} preview={preview}>
            <Container>
            {
                    allPosts.length > 0 && 
                    (<div className="mt-6 grid grid-rows-1 lg:grid-cols-4 grid-cols-1  gap-10">
                    <div className="grid-cols-1 hidden lg:block">
                        <div className='w-full h-screen  flex flex-col'>
                        <h1 className="font-semibold text-xl my-4">All Tools</h1>
                        <div className="display-none mb-8 lg:block text-gray-800">
                            {/* <div className="px-2">
                                <h1 className="font-semibold pb-2 mb-2 border-b border-gray-300 pr-3 text-xs uppercase text-gray-900">All Tools</h1>
                            </div> */}
                            {/* <div className="cursor-pointer text-sm">
                                <Link href={'/toolbox/ux-tools/page/1'}><div className="text-gray-700 hover:text-blue-500 p-2 rounded"># UX tools</div></Link>
                            </div>
                            <div className="cursor-pointer text-sm">
                                <Link href={'/toolbox/ux-tools/page/1'}><div className="text-gray-700 hover:text-blue-500 p-2 rounded"># Virtual Realilty</div></Link>
                            </div>
                            <div className="cursor-pointer text-sm">
                                <Link href={'/toolbox/ux-tools/page/1'}><div className="text-gray-700 hover:text-blue-500 p-2 rounded"># Prototyping tools</div></Link>
                            </div> */}

                            <div className="px-2">
                                <h1 className="font-semibold pb-2 mb-2 border-b border-gray-300 pr-3 text-xs uppercase text-gray-900">UX Tools</h1>
                            </div>
                            {
                                ALL_SLUGS && ALL_SLUGS.map((item, index) => {
                                    return (
                                        <div className="cursor-pointer text-sm" key={`toolbox_${slug}_cat_${index}`}>
                                            <Link href={`/toolbox/${item.key}/page/1`}>
                                                <div className={`text-gray-700 hover:text-blue-500 p-2 rounded ${item.key === slug ? ' text-blue-600 font-semibold' : ''}`}>
                                                {item.name}
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                            {/* <div className="cursor-pointer text-sm">
                                <Link href={'/toolbox/ux-tools/page/1'}><div className="text-gray-700 hover:text-blue-500 p-2 rounded"># User Analysis</div></Link>
                            </div>
                            <div className="cursor-pointer text-sm">
                                <Link href={'/toolbox/ux-tools/page/1'}><div className="text-gray-700 hover:text-blue-500 p-2 rounded"># User Journey</div></Link>
                            </div>
                            <div className="cursor-pointer text-sm">
                                <Link href={'/toolbox/ux-tools/page/1'}><div className="text-gray-700 hover:text-blue-500 p-2 rounded"># User Research</div></Link>
                            </div> */}

                            <Link href="/toolbox/ux-tools/page/1">
                                <a className="inline-block text-blue-600 my-2 text-sm px-2">Browse all UX →</a>
                            </Link>
                        </div>
                    </div>
                       
                    </div>
                    <div className="col-span-3">
                        <MoreStories posts={allPosts} type="toolbox" />
                    </div>
                </div>)
            }
            
            <NewPagination 
                total={pagination?.total}
                pageSize={PAGE_SIZE}
                currentPage={pagination?.page}
                onPageNumChange={(pageNum) => {onPageNumChange(pageNum)}}
            />
            </Container>
        </Layout>
    )
}

export async function getStaticProps({ preview = null, params}) {
    const pageSize = PAGE_SIZE
    const {pageNo, slug} = params;
    const foundSlug = ALL_SLUGS.find((SLUG, index) => {
        return slug === SLUG.key
    })
    const allPosts = (await getPostsByPageForToolsSubcategoryPage(preview, pageSize, pageNo, foundSlug.tags )) || []
    // const allPosts = (await getPostsByPageForToolsSubcategoryPage(preview, pageSize, pageNo, ["whiteboard"] )) || []
    const pagination = allPosts.meta.pagination
    return {
        props: {
            allPosts: allPosts.data, preview, pagination,slug
        },
    }
  }

export async function getStaticPaths() {
    let pageCountRes = 0;
    let pageCountArr = [];
    ALL_SLUGS.map(async (item, index)  => {
        const allPosts = (await getAllPostsForToolsSubcategoryPage(null, PAGE_SIZE, 0, item.tags)) || []
        // const allPosts = (await getAllPostsForToolsSubcategoryPage(null, PAGE_SIZE, 0,["whiteboard"])) || []
        const pagination = allPosts.meta.pagination
        const pageCount = pagination.pageCount
        let arr = new Array(pageCount).fill('');
        let newArr = arr.map((i,index) => {
            return `toolbox/${item.key}/page/${index+1}`
        })
        pageCountArr = pageCountArr.concat(newArr)
    })
    return {
        paths: pageCountArr || [],
        fallback: true,
    }
}