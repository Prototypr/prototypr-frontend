import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import NewPagination from '@/components/pagination'
import FilterCategory from '@/components/FilterCategory'

import { getAllPostsForToolsPage, getPostsByPageForToolsPage } from '@/lib/api'
import Link from 'next/link'
const PAGE_SIZE = 13;
const ALL_SLUGS = ["whiteboard", "onboarding", "testing", "feedback", "moodboards", "mindmapping", "persona", "user-flow", "journey-map", "onboarding", "storymapping", "recruiting", "transcription", "survey", "analytics", "annotate"]


export default function ToolboxPage({allPosts = [], preview, pagination}) {
    //pagination is like {"total":1421,"pageSize":12,"page":2,"pageCount":119}
    const router = useRouter()

    const [selectedFilter, setSelectedFilter] = useState("")
    const onPageNumChange = (pageNo) => {
        router.push(`/toolbox/page/${pageNo}`)
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
                            <div className="cursor-pointer text-sm">
                                <Link href={'/toolbox/ux-tools/page/1'}><div className="text-gray-700 hover:text-blue-500 p-2 rounded"># User Analysis</div></Link>
                            </div>
                            <div className="cursor-pointer text-sm">
                                <Link href={'/toolbox/ux-tools/page/1'}><div className="text-gray-700 hover:text-blue-500 p-2 rounded"># User Journey</div></Link>
                            </div>
                            <div className="cursor-pointer text-sm">
                                <Link href={'/toolbox/ux-tools/page/1'}><div className="text-gray-700 hover:text-blue-500 p-2 rounded"># User Research</div></Link>
                            </div>
                            <div className="cursor-pointer text-sm">
                                <Link href={'/toolbox/ux-tools/page/1'}><div className="hover:text-blue-500 text-blue-600 font-semibold p-2 rounded">Browse all UX tools</div></Link>
                            </div>
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
    const page = params.pageNo
    const allPosts = (await getPostsByPageForToolsPage(preview, pageSize, page )) || []
    
    const pagination = allPosts.meta.pagination
    return {
        props: {
            allPosts: allPosts.data, preview, pagination
        },
    }
  }

export async function getStaticPaths() {
    const allPosts = (await getAllPostsForToolsPage(null, PAGE_SIZE, 0)) || []
    const pagination = allPosts.meta.pagination
    const pageCount = pagination.pageCount
    const pageCountArr = new Array(pageCount).fill(' ');
    return {
        paths: pageCountArr && pageCountArr.map((pageNo) => {
            return `/toolbox/page/${pageNo}`
        }) || [],
        fallback: true,
    }
}