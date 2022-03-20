import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import NewPagination from '@/components/pagination'
import FilterCategory from '@/components/FilterCategory'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getAllPostsForToolsSubcategoryPage, getPostsByPageForToolsSubcategoryPage } from '@/lib/api'

import ALL_SLUGS_GROUPS from "@/lib/menus/uxTools";

const PAGE_SIZE = 12;
const ALL_SLUGS = [{
    key: "heatmaps",
    name: "# Heatmaps",
    tags: ["analytics", "heat-map"]
},{
    key: "record",
    name: "# Recording",
    tags: ["record"]
},{
    key: "recruiting",
    name: "# Recruiting",
    tags: ["recruit"]
},{
    key: "transcribe",
    name: "# Transcription",
    tags: ["transcribe"]
}, {
    key: "survey",
    name: "# Survey Tools",
    tags: ["survey"]
},{
    key: "collaboration",
    name: "# Collaboration",
    tags: ["collaboration"]
},{
    key: "mindmapping",
    name: "# Mindmapping",
    tags: ["mindmapping"]
},{
    key: "moodboards",
    name: "# Moodboards",
    tags: ["moodboards", "moodboard"]
},{
    key: "whiteboard",
    name: "# Whiteboarding",
    tags: ["whiteboard"]
},{
  key: "feedback",
  name: "# Feedback",
  tags: ["feedback"],
},{
  key: "kanban",
  name: "# Kanban",
  tags: ["kanban"],
},{
  key: "notes",
  name: "# Note Taking",
  tags: ["notes"],
},{
  key: "roadmapping",
  name: "# Roadmapping",
  tags: ["project-management"],
},{
  key: "workspace",
  name: "# Workspace",
  tags: ["workspace"],
},{
  key: "journey",
  name: "# Journey Map",
  tags: ["journey-map", "user-journey"],
},{
  key: "journey",
  name: "# Onboarding",
  tags: ["onboarding"],
},
{
  key: "personas",
  name: "# Personas",
  tags: ["persona", "personas"],
},
{
  key: "userflow",
  name: "# User Flow",
  tags: ["user-flow", "Storymapping"],
}];

const BREADCRUMBS = {
  pageTitle:'UX Tools',
  links:[
      {name:'Home', slug:'/'},
      {name:'Toolbox', slug:'/toolbox/page/1'},
      {name:'UX Tools', slug:'/toolbox/ux-tools/page/1'}
  ]
}

export default function ToolboxPage({allPosts = [], preview, pagination,slug}) {
    //pagination is like {"total":48,"pageSize":13,"page":1,"pageCount":4}
    const router = useRouter()

    const [selectedFilter, setSelectedFilter] = useState("")
    const onPageNumChange = (pageNo) => {
        router.push({
            pathname:`/toolbox/ux-tools/[slug]/page/${pageNo}`,
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
                        <div className='w-full min-h-screen  flex flex-col'>
                        <Breadcrumbs 
                        urlRoot={'/toolbox/ux-tools'}
                        title={BREADCRUMBS.pageTitle}
                        links={BREADCRUMBS.links}
                        currentSlug={slug}
                        />
                        <FilterCategory
                         urlRoot={'/toolbox/ux-tools'}
                         items={ALL_SLUGS_GROUPS} 
                         key={'uxtools_item_'} 
                         slug={slug}
                         />
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
            return `toolbox/ux-tools/${item.key}/page/${index+1}`
        })
        pageCountArr = pageCountArr.concat(newArr)
    })
    return {
        paths: pageCountArr || [],
        fallback: true,
    }
}