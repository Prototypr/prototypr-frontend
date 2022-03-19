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

const ALL_SLUGS_GROUPS = [
 {
    title: "UI",
    subItems: [
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
        }
    ]
},{
    title: "UX",
    subItems: [{
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
},
{
    title: "Plugins",
    subItems: [{
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
    }]
},{
    title: "Prototyping",
    subItems: [{
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
    }]
  },{
      title: "Mixed Reality",
      subItems: [{
        key: "ar",
        name: "Augmented Reality",
        tags: ["ar", "augmented-reality"]
      },{
        key: "vr",
        name: "Virtual Reality",
        tags: ["vr", "virtual-reality"]
      }]
  },{
      title: "Conversational Design",
      subItems: [{
          key: "chatbots",
          name: "Chat Bots",
          tags: ["chat", "chat-bot"]
      }]
  }
];


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
                    <div className="w-full h-screen  flex flex-col">
                    <h1 className="font-semibold text-2xl">Toolbox</h1>
                    <div className="pt-1 text-sm text-gray-700 pb-8">
                    <Link href="/">
                        <a>Home</a>
                    </Link>{" "}
                    →{" "}
                    <Link href="/toolbox/page/1">
                        <a>Toolbox</a>
                    </Link>
                    →{" "}
                    <Link href={`/toolbox/${slug}/page/1`}>
                        <a>{slug}</a>
                    </Link>
                    </div>
                <div className="display-none mb-8 lg:block text-gray-800">
                  {ALL_SLUGS_GROUPS.map((item, index) => {
                    return (
                      <div
                        key={`uxtools_item_${index}`}
                        className="mb-8 text-gray-800"
                      >
                        <div className="px-2">
                          <h1 className="font-semibold pb-2 mb-2 border-b border-gray-300 pr-3 text-xs uppercase text-gray-900">
                            {item.title}
                          </h1>
                        </div>
                        {item.subItems.map((sItem, sIndex) => {
                          return (
                            <div
                              className="cursor-pointer text-sm"
                              key={`toolbox_cat_${sIndex}`}
                            >
                              <Link href={`/toolbox/${sItem.key}/page/1`}>
                                <div className="text-gray-700 hover:text-blue-500 p-2 rounded">
                                  {sItem.name}
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
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