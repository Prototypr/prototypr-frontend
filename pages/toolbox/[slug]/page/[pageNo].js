import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import NewPagination from '@/components/pagination'
import FilterCategory from '@/components/FilterCategory'
import Breadcrumbs from '@/components/Breadcrumbs'

// import { getAllPostsForToolsPage, getPostsByPageForToolsPage } from '@/lib/api'
import { getAllPostsForToolsSubcategoryPage, getPostsByPageForToolsSubcategoryPage } from '@/lib/api'

import ALL_SLUGS_GROUPS from '@/lib/menus/allTools'

const PAGE_SIZE = 12;
const ALL_SLUGS = [
    {
        key: "accessibility",
        name: "# Accessibility",
        tags: ["accessibility", "contrast"],
    },
    {
        key: "color",
        name: "# Color",
        tags: ["color", "colour", "colors"]
    },
    {
        key: "css",
        name: "# CSS",
        tags: ["css"]
    },
    {
        key: "icons",
        name: "# Icons",
        tags: ["icons"]
    },
    {
        key: "illustration",
        name: "# Illustration",
        tags: ["illustration", "illustrations"]
    },{
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
    },{
        key: "xd",
        name: "Adobe XD",
        tags: ["xd", "adobe-xd", "xd-plugin"]
    },{
        key: "figma",
        name: "Figma",
        tags: ["figma", "figma-plugin"]
    },{
        key: "marvel",
        name: "Marvel",
        tags: ["marvel", "marvel-app"]
    },{
        key: "sketch",
        name: "Sketch",
        tags: ["sketch", "sketch-app", "sketch-plugin"]
    },{
        key: "design",
        name: "Design",
        tags: ["prototyping", "design-tool", "prototyping-tool"]
    },{
        key: "handoff",
        name: "Handoff",
        tags: ["handoff", "design-to-code"]
    },{
        key: "interactions",
        name: "Interactions",
        tags: ["microinteractions", "interactions", "animation"]
    },{
        key: "ar",
        name: "Augmented Reality",
        tags: ["ar", "augmented-reality"]
      },{
        key: "vr",
        name: "Virtual Reality",
        tags: ["vr", "virtual-reality"]
      },{
        key: "chatbots",
        name: "Chat Bots",
        tags: ["chat", "chat-bot"]
    }
]


const BREADCRUMBS = {
    pageTitle:'Toolbox',
    links:[
        {name:'Home', slug:'/'},
        {name:'Toolbox', slug:'/toolbox/page/1'}
    ]
}

export default function ToolboxPage({allPosts = [], preview, pagination,slug}) {
    //pagination is like {"total":48,"pageSize":13,"page":1,"pageCount":4}
    const router = useRouter()

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
                    <div className="w-full min-h-screen  flex flex-col">
                   
                    <Breadcrumbs 
                    title={BREADCRUMBS.pageTitle}
                    links={BREADCRUMBS.links}
                    currentSlug={slug}
                    />
                    <FilterCategory items={ALL_SLUGS_GROUPS} key={'uxtools_item_'} slug={slug}/>
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