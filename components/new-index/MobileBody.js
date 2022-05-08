import dynamic from "next/dynamic";

import Container from "@/components/container";
const DesignTool = dynamic(() => import("@/components/new-index/DesignTool"));
const SourcePanel = dynamic(() => import("@/components/new-index/SourcePanel"));
const TopicSpotlights = dynamic(() =>
  import("@/components/new-index/TopicSpotlights")
);
const Aspiring = dynamic(() => import("@/components/new-index/Aspiring"));
const Feeds = dynamic(() => import("@/components/new-index/Feeds"));


import { useIntl } from "react-intl";

const TAB_ITEMS = [
  {
    slug: "accessibility",
    name: "topicSpotlight.tabs.accessibility",
  },
  {
    slug: "user-research",
    name: "topicSpotlight.tabs.userResearch",
  },
  {
    slug: "ux-writing",
    name: "topicSpotlight.tabs.userWriting",
  },
  {
    slug: "vr",
    name: "topicSpotlight.tabs.vr",
  },
  {
    slug: "code",
    name: "topicSpotlight.tabs.code",
  },
];

export default function Index({
  allTools,
  otherPosts,
  interviewPosts,
  topicRes,
}) {
  const intl = useIntl();

  return (
    <>
        <DesignTool allTools={allTools} />
        <Container>
        <SourcePanel 
          title={intl.formatMessage({ id: "navbar.contentitem.title"})}
          desc={intl.formatMessage({ id: "sourcepanel.desc"})}
          />
          <TopicSpolights tabs={TAB_ITEMS} topics={topicRes} />
          <Aspiring posts={interviewPosts} />
          <Feeds posts={otherPosts} />
        </Container>
    </>
  );
}