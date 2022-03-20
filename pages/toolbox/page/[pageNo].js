import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Container from "@/components/container";
import MoreStories from "@/components/more-stories";
import NewPagination from "@/components/pagination";
import FilterCategory from "@/components/FilterCategory";

import { getAllPostsForToolsPage, getPostsByPageForToolsPage } from "@/lib/api";
import Link from "next/link";
const PAGE_SIZE = 12;
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
        tags: ["color", "colour", "colors"],
      },
      {
        key: "css",
        name: "# CSS",
        tags: ["css"],
      },
      {
        key: "icons",
        name: "# Icons",
        tags: ["icons"],
      },
      {
        key: "illustration",
        name: "# Illustration",
        tags: ["illustration", "illustrations"],
      },
    ],
  },
  {
    title: "UX",
    moreLink:<Link href="/toolbox/ux-tools/page/1">
                <a className="inline-block text-blue-600 my-2 text-sm">Browse all UI →</a>
            </Link>,
    subItems: [
      {
        key: "analysis",
        name: "User Analysis",
        tags: [
          "testing",
          "analytics",
          "user-analytics",
          "interview",
          "persona",
        ],
      },
      {
        key: "journey",
        name: "User Journey",
        tags: ["journey", "journey-map", "user-flow"],
      },
      {
        key: "research",
        name: "User Research",
        tags: ["exploration", "research", "user-research"],
      },
    ],
  },
  {
    title: "Plugins",
    subItems: [
      {
        key: "xd",
        name: "Adobe XD",
        tags: ["xd", "adobe-xd", "xd-plugin"],
      },
      {
        key: "figma",
        name: "Figma",
        tags: ["figma", "figma-plugin"],
      },
      {
        key: "marvel",
        name: "Marvel",
        tags: ["marvel", "marvel-app"],
      },
      {
        key: "sketch",
        name: "Sketch",
        tags: ["sketch", "sketch-app", "sketch-plugin"],
      },
    ],
  },
  {
    title: "Prototyping",
    moreLink:<Link href="/prototyping/page/1">
                <a className="inline-block text-blue-600 my-2 text-sm">Browse all Prototyping →</a>
            </Link>,
    subItems: [
      {
        key: "design",
        name: "Design",
        tags: ["prototyping", "design-tool", "prototyping-tool"],
      },
      {
        key: "handoff",
        name: "Handoff",
        tags: ["handoff", "design-to-code"],
      },
      {
        key: "interactions",
        name: "Interactions",
        tags: ["microinteractions", "interactions", "animation"],
      },
    ],
  },
  {
    title: "Mixed Reality",
    moreLink:<Link href="/toolbox/augmented-reality-tools/page/1">
                <a className="inline-block text-blue-600 my-2 text-sm">Browse all VR/AR →</a>
            </Link>,
    subItems: [
      {
        key: "ar",
        name: "Augmented Reality",
        tags: ["ar", "augmented-reality"],
      },
      {
        key: "vr",
        name: "Virtual Reality",
        tags: ["vr", "virtual-reality"],
      },
    ],
  },
  {
    title: "Conversational Design",
    moreLink:<Link href="/toolbox/conversational-design-tools/page/1">
      <a className="inline-block text-blue-600 my-2 text-sm">Browse all Conversational →</a>
    </Link>,
    subItems: [
      {
        key: "chatbots",
        name: "Chat Bots",
        tags: ["chat", "chat-bot"],
      },
    ],
  },
];

export default function ToolboxPage({
  allPosts = [],
  preview,
  pagination = {},
}) {
  //pagination is like {"total":1421,"pageSize":12,"page":2,"pageCount":119}
  const router = useRouter();

  const [selectedFilter, setSelectedFilter] = useState("");
  const onPageNumChange = (pageNo) => {
    router.push(`/toolbox/page/${pageNo}`);
  };

  return (
    <Layout activeNav={"toolbox"} preview={preview}>
      <Container>
        {allPosts.length > 0 && (
          <div className="mt-6 grid grid-rows-1 lg:grid-cols-4 grid-cols-1  gap-10">
            <div className="grid-cols-1 hidden lg:block">
              <div className="w-full min-h-screen  flex flex-col">
                <h1 className="font-semibold text-2xl">Toolbox</h1>
                <div className="pt-1 text-sm text-gray-700 pb-8">
                  <Link href="/">
                    <a>Home</a>
                  </Link>{" "}
                  →{" "}
                  <Link href="/toolbox/page/1">
                    <a>Toolbox</a>
                  </Link>
                </div>
                <div className="display-none mb-8 lg:block text-gray-800">
                  {ALL_SLUGS_GROUPS.map((item, index) => {
                    return (
                      <div
                        key={`uxtools_item_${index}`}
                        className="mb-8 text-gray-800"
                      >
                        <div className="">
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
                                <div className="text-gray-700 hover:text-blue-500 py-2 rounded">
                                  {sItem.name}
                                </div>
                              </Link>
                            </div>
                          );
                        })}

                        {item.moreLink && item.moreLink}
                      </div>
                    );
                    
                  })}

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
    (await getPostsByPageForToolsPage(preview, pageSize, page)) || [];
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
  const allPosts = (await getAllPostsForToolsPage(null, PAGE_SIZE, 0)) || [];
  const pagination = allPosts.meta.pagination;
  const pageCount = pagination.pageCount;
  const pageCountArr = new Array(pageCount).fill(" ");
  return {
    paths:
      (pageCountArr &&
        pageCountArr.map((pageNo) => {
          return `/toolbox/page/${pageNo}`;
        })) ||
      [],
    fallback: true,
  };
}
