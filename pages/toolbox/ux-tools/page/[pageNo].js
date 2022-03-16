import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/layout";
import Container from "@/components/container";
import MoreStories from "@/components/more-stories";
import NewPagination from "@/components/pagination";
import FilterCategory from "@/components/FilterCategory";
import {
  getAllPostsForToolsSubcategoryPage,
  getPostsByPageForToolsSubcategoryPage,
} from "@/lib/api";
const PAGE_SIZE = 12;
const ALL_SLUGS = [
  "whiteboard",
  "onboarding",
  "testing",
  "feedback",
  "moodboards",
  "mindmapping",
  "persona",
  "user-flow",
  "journey-map",
  "onboarding",
  "storymapping",
  "recruiting",
  "transcription",
  "survey",
  "analytics",
  "annotate",
];
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

export default function ToolboxPage({ allPosts = [], preview, pagination }) {
  //pagination is like {"total":1421,"pageSize":12,"page":2,"pageCount":119}
  const [selectedFilter, setSelectedFilter] = useState("");
  const router = useRouter();

  const onPageNumChange = (pageNo) => {
    router.push(`/toolbox/ux-tools/page/${pageNo}`);
  };

  return (
    <Layout activeNav={"toolbox"} preview={preview}>
      <Container>
        {allPosts.length > 0 && (
          <div className="mt-6 grid grid-rows-1 lg:grid-cols-4 grid-cols-1  gap-10">
            <div className="grid-cols-1 hidden lg:block">
              <div className="w-full h-screen  flex flex-col">
                <h1 className="font-semibold text-xl my-4">UX Tools</h1>
                <div className="display-none mb-8 lg:block text-gray-800">
                  {
                    ALL_SLUGS_GROUPS.map((item, index) => {
                      return (
                        <div key={`uxtools_item_${index}`} className="mb-8 text-gray-800">
                          <div className="px-2">
                            <h1 className="font-semibold pb-2 mb-2 border-b border-gray-300 pr-3 text-xs uppercase text-gray-900">
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
                                  <div className="text-gray-700 hover:text-blue-500 p-2 rounded">
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
          </div>
        )}

        <NewPagination
          total={pagination?.total}
          pageSize={PAGE_SIZE}
          currentPage={pagination?.page}
          onPageNumChange={(pageNum) => {
            onPageNumChange(pageNum);
          }}
        />
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = null, params }) {
  const pageSize = PAGE_SIZE;
  const page = params.pageNo;
  const allPosts =
    (await getPostsByPageForToolsSubcategoryPage(
      preview,
      pageSize,
      page,
      ALL_SLUGS
    )) || [];

  const pagination = allPosts.meta.pagination;
  return {
    props: {
      allPosts: allPosts.data,
      preview,
      pagination,
    },
  };
}

export async function getStaticPaths() {
  const allPosts =
    (await getAllPostsForToolsSubcategoryPage(null, PAGE_SIZE, 0, ALL_SLUGS)) ||
    [];
  const pagination = allPosts.meta.pagination;
  const pageCount = pagination.pageCount;
  const pageCountArr = new Array(pageCount).fill(" ");
  return {
    paths:
      (pageCountArr &&
        pageCountArr.map((pageNo) => {
          return `/toolbox/ux-tools/page/${pageNo}`;
        })) ||
      [],
    fallback: true,
  };
}
