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
    <Container maxWidth="max-w-[1320px] mt-7 mb-2">
      <div className="flex">
        {/* browse all */}
        <GiantTag classes={`${currentPage=='topics'?'border border-gray-800':''} pl-2`} link={`/topics`}>
          <div className="flex">
          <Compass weight={`${currentPage=='topics'?'fill':'regular'}`} size={24} />
            <div className="ml-2 my-auto">Explore topics</div>
          </div>
        </GiantTag>
        <div className="ml-4 flex flex-wrap">
          {tags.map((tag, index) => {
            return <GiantTag link={`${tag?.link || "/"}`}>{tag.name}</GiantTag>;
          })}
        </div>
      </div>
    </Container>
  );
};
export default TagsNavRow;
