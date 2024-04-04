import Container from "@/components/container";
import BigTag from "@/components/v4/tag/BigTag";
import GiantTag from "../tag/GiantTag";
import {Compass} from 'phosphor-react'

const tags = [
    {
      name: "Accessibility",
      link: "/posts/accessibility/page/1",
    },
    {
      name: "AI",
      link: "/posts/ai/page/1",
    },
    {
      name: "Branding",
      link: "/posts/branding/page/1",
    },
    {
      name: "Figma",
      link: "/posts/figma/page/1",
    },
    {
      name: "Notion",
      link: "/posts/notion/page/1",
    },
    {
      name: "Interview",
      link: "/posts/interview/page/1",
    },
    {
      name: "Open Source",
      link: "/posts/open-source/page/1",
    },
    {
      name: "Psychology",
      link: "/posts/design-psychology/page/1",
    },
    {
      name: "UI",
      link: "/posts/ui/page/1",
    },
    {
      name: "User Research",
      link: "/posts/ui/page/1",
    },
    // {
    //   name: "Web Monetization",
    //   link: "/posts/web-monetization/page/1",
    // },
    // {
    //   name: "Career",
    //   link: "/posts/career/page/1",
    // },
  ];

const TagsNavRow = ({currentPage}) => {
  return (
    <Container padding={false} maxWidth={"max-w-[1320px] mx-auto mb-2.5 px-6 md:px-3"}>
        {/* browse all */}
        <div className="flex flex-wrap">
        <GiantTag classes={`${currentPage=='topics'?'border border-gray-800':''} pl-2 mr-4 md:mr-8`} link={`/topics`}>
          <div className="flex">
          <Compass weight={`${currentPage=='topics'?'fill':'regular'}`} size={24} />
            <div className="ml-2 my-auto">Explore topics</div>
          </div>
        </GiantTag>
          {tags.map((tag, index) => {
            return <GiantTag link={`${tag?.link || "/"}`}>{tag.name}</GiantTag>;
          })}
        </div>
    </Container>
  );
};
export default TagsNavRow;
