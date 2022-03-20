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

const ALL_SLUGS_GROUPS = [
    {
      title: "ANALYSIS",
      subItems: [
        {
          key: "heatmaps",
          name: "# Heatmaps",
          tags: ["analytics", "heat-map"],
        },
        {
          key: "record",
          name: "# Recording",
          tags: ["record"],
        },
        {
          key: "recruiting",
          name: "# Recruiting",
          tags: ["recruit"],
        },
        {
          key: "transcribe",
          name: "# Transcription",
          tags: ["transcribe"],
        },
        {
          key: "survey",
          name: "# Survey Tools",
          tags: ["survey"],
        },
      ],
    },
    {
      title: "BRAINSTORM",
      subItems: [
        {
          key: "collaboration",
          name: "# Collaboration",
          tags: ["collaboration"],
        },
        {
          key: "mindmapping",
          name: "# Mindmapping",
          tags: ["mindmapping"],
        },
        {
          key: "moodboards",
          name: "# Moodboards",
          tags: ["moodboards", "moodboard"],
        },
        {
          key: "whiteboard",
          name: "# Whiteboarding",
          tags: ["whiteboard"],
        },
      ],
    },
    {
      title: "PROJECT MANAGEMENT",
      subItems: [
        {
          key: "feedback",
          name: "# Feedback",
          tags: ["feedback"],
        },
        {
          key: "kanban",
          name: "# Kanban",
          tags: ["kanban"],
        },
        {
          key: "notes",
          name: "# Note Taking",
          tags: ["notes"],
        },
        {
          key: "roadmapping",
          name: "# Roadmapping",
          tags: ["project-management"],
        },
        {
          key: "workspace",
          name: "# Workspace",
          tags: ["workspace"],
        },
      ],
    },
    {
      title: "USER JOURNEY",
      subItems: [
        {
          key: "journey",
          name: "# Journey Map",
          tags: ["journey-map", "user-journey"],
        },
        {
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
        },
      ],
    },
  ];



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
                        <h1 className="font-semibold text-2xl">All Tools</h1>
                        <div className="pt-1 text-sm text-gray-700 pb-8">
                          <Link href="/">
                              <a>Home</a>
                          </Link>{" "}
                          →{" "}
                          <Link href="/toolbox/ux-tools/page/1">
                              <a>UX Tools</a>
                          </Link>
                          →{" "}
                          <Link href={`/toolbox/ux-tools/${slug}/page/1`}>
                              <a className="capitalize">{slug}</a>
                          </Link>
                        </div>
                        <div className="display-none mb-8 lg:block text-gray-800">
                        {
                            ALL_SLUGS_GROUPS.map((item, index) => {
                            return (
                                <div key={`uxtools_item_${index}`} className="mb-8 text-gray-800">
                                <div className="">
                                    <h1 className="font-bold pb-2 mb-2 border-b border-gray-300 pr-3 text-xs uppercase text-gray-900">
                                    {item.title}
                                    </h1>
                                </div>
                                {item.subItems.map((sItem, sIndex) => {
                                    return (
                                    <div
                                        className="cursor-pointer text-sm"
                                        key={`ux-tools_cat_${sIndex}`}
                                    >
                                        <Link
                                        href={`/toolbox/ux-tools/${sItem.key}/page/1`}
                                        >
                                        <div className={`hover:text-blue-500 py-2 rounded ${sItem.key==slug ?'text-blue-600 font-semibold':'text-gray-700'}`}>
                                            {sItem.name}
                                        </div>
                                        </Link>
                                    </div>
                                    );
                                })}
                                </div>
                            );
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