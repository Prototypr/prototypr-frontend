import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import NewPagination from '@/components/pagination'
import FilterCategory from '@/components/FilterCategory'
import { getAllPostsForToolsSubcategoryPage, getPostsByPageForToolsSubcategoryPage } from '@/lib/api'
const PAGE_SIZE = 13;
const ALL_SLUGS = ["whiteboard", "onboarding", "testing", "feedback", "moodboards", "mindmapping", "persona", "user-flow", "journey-map", "onboarding", "storymapping", "recruiting", "transcription", "survey", "analytics", "annotate"]

export default function ToolboxPage({allPosts = [], preview, pagination}) {
    //pagination is like {"total":1421,"pageSize":12,"page":2,"pageCount":119}
    const [selectedFilter, setSelectedFilter] = useState("")
    const router = useRouter()

    const onPageNumChange = (pageNo) => {
        router.push(`/toolbox/ux-tools/page/${pageNo}`)
      }

    return (
        <Layout activeNav={'toolbox'} preview={preview}>
            <Container>
            {
            allPosts.length > 0 &&
            (
                <div className="mt-6 grid grid-rows-1 lg:grid-cols-4 grid-cols-1  gap-10">
                    <div className="grid-cols-1 hidden lg:block">
                        <FilterCategory 
                        items={ALL_SLUGS} 
                        title="UX Tools" 
                        selectedItem={selectedFilter}
                        onSelectedItemChange = {(item) => {
                            if (selectedFilter === item) {
                                setSelectedFilter("");
                            } else {
                                setSelectedFilter(item)
                            }
                            //TODO:to do GQL Query again
                        }}/>
                    </div>
                    <div className="col-span-3">
                        <MoreStories posts={allPosts} type="toolbox" />
                    </div>
                </div>
            )
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
    const allPosts = (await getPostsByPageForToolsSubcategoryPage(preview, pageSize, page, ALL_SLUGS )) || []
    
    console.log(allPosts)
    const pagination = allPosts.meta.pagination
    return {
        props: {
            allPosts: allPosts.data, preview, pagination
        },
    }
  }

export async function getStaticPaths() {
    const allPosts = (await getAllPostsForToolsSubcategoryPage(null, PAGE_SIZE, 0, ALL_SLUGS)) || []
    const pagination = allPosts.meta.pagination
    const pageCount = pagination.pageCount
    const pageCountArr = new Array(pageCount).fill(' ');
    return {
        paths: pageCountArr && pageCountArr.map((pageNo) => {
            return `/toolbox/ux-tools/page/${pageNo}`
        }) || [],
        fallback: true,
    }
}