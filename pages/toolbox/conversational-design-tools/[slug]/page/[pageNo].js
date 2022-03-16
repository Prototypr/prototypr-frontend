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
    key: "chat_design",
    name: "Chat Design",
    tags: ["prototyping", "chat"]
},{
    key: "platforms",
    name: "Platforms",
    tags: ["tool", "chat"]
},{
    key: "chatbot_generators",
    name: "Chatbot Generators",
    tags: ["generator", "chat"]
},{
    key: "curated_resources",
    name: "Curated Resources",
    tags: ["resource", "chat"]
}]



export default function ToolboxPage({allPosts = [], preview, pagination,slug}) {
    //pagination is like {"total":48,"pageSize":13,"page":1,"pageCount":4}
    const router = useRouter()

    const [selectedFilter, setSelectedFilter] = useState("")
    const onPageNumChange = (pageNo) => {
        router.push({
            pathname:`/toolbox/conversational-design-tools/[slug]/page/${pageNo}`,
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

                            <div className="px-2">
                                <h1 className="font-semibold pb-2 mb-2 border-b border-gray-300 pr-3 text-xs uppercase text-gray-900">UX Tools</h1>
                            </div>
                            {
                                ALL_SLUGS && ALL_SLUGS.map((item, index) => {
                                    return (
                                        <div className="cursor-pointer text-sm" key={`toolbox_${slug}_cat_${index}`}>
                                            <Link href={`/toolbox/conversational-design-tools/${item.key}/page/1`}>
                                                <div className={`text-gray-700 hover:text-blue-500 p-2 rounded ${item.key === slug ? ' text-blue-600 font-semibold' : ''}`}>
                                                {item.name}
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
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
    // console.log('page info**********' + JSON.stringify(allPosts.meta.pagination))
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
        const pagination = allPosts.meta.pagination
        const pageCount = pagination.pageCount
        let arr = new Array(pageCount).fill('');
        let newArr = arr.map((i,index) => {
            return `toolbox/conversational-design-tools/${item.key}/page/${index+1}`
        })
        pageCountArr = pageCountArr.concat(newArr)
    })
    return {
        paths: pageCountArr || [],
        fallback: true,
    }
}