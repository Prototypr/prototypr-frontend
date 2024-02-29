// import SidebarDiscover from "@/components/v4/layout/SidebarDiscover";
import Container from "@/components/container";
// import LargePostGridC from "@/components/v4/layout/LargePostGridB";
// import TopicsGridHome from "../layout/TopicsGridHome";
// import PostsGroup3Cards from "../layout/PostsGroup3Cards";
import { ArrowRight, Tag } from "phosphor-react";
import Link from "next/link";
import { useIntl } from "react-intl";

import PostGroupRow from "../layout/PostGroupRow";
// import {RssSimple} from 'phosphor-react'
const TopicIndexSection = ({index,user, heroCardPost, viewablePosts, jobsSidebar,title , topicObject}) => {
 
  const intl = useIntl();
  return (
    <Container padding={false} maxWidth="px-3 max-w-[1320px]">
      <div className={`w-full h-full grid grid-cols-12 flex justify-center rounded-3xl`}>
        <div className={`w-full max-w-full flex flex-col gap-2 col-span-12 py-3 `}>
          {/* <LargePostGridC title={title} largePost={heroCardPost} smallPosts={viewablePosts} /> */}
          {/* <TopicsGridHome
            slug={topicObject?.slug}
            heading={title}
            showHeading={true}
            largePost={viewablePosts[0]}
            smallPosts={viewablePosts.splice(1)}
            // tools={toolsList}
          /> */}
          <div className="flex w-full justify-between mb-3 md:mb-6">
            <div className="flex">
              <Tag className="inline-block my-auto mr-3" size={32}/>
              <h2 className="text-xl my-auto md:text-3xl capitalize font-semibold text-black/90">
              {intl.formatMessage({ id: title })}
              </h2>
            </div>
            <div className="my-auto">
              <div className="flex relative">
              <div className="text-md inline text-gray-800 font-normal font-inter">
              <Link href={`/posts/${topicObject.slug}/page/1`}>See all</Link>
              </div>
              <div className="my-auto">
                <Link href={`/posts/${topicObject.slug}/page/1`}>
                  <div className="bg-blue-100 outline outline-1 outline-blue-300/50 ml-2.5 flex justify-center my-auto h-6 w-6 rounded-full">
                      <ArrowRight weight="bold" size={14} className="text-blue-900 my-auto"/>
                  </div>
                </Link>
              </div>
            </div>
            </div>
          </div>

           {/* <PostsGroup3Cards
          posts={viewablePosts} 
          cols={4}
          /> */}
          <PostGroupRow smallPosts={viewablePosts} />
        </div>
        {/* <SidebarDiscover
          paddingTop="hidden ml-4 pl-6 lg:block pt-12"
          content={jobsSidebar}
        /> */}
      </div>
    </Container>
  );
};

export default TopicIndexSection;
