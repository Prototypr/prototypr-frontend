import BigTag from "@/components/v4/tag/BigTag";
const tags = [
  {
    name: "Accessibility",
    link: "/topic/accessibility/page/1",
  },
  {
    name: "AI",
    link: "/topic/ai/page/1",
  },
  {
    name: "Open Source",
    link: "/topic/open-source/page/1",
  },
  {
    name: "Branding",
    link: "/topic/branding/page/1",
  },
  {
    name: "UI",
    link: "/topic/ui/page/1",
  },
  {
    name: "Figma",
    link: "/topic/figma/page/1",
  },
  {
    name: "User Research",
    link: "/topic/user-research/page/1",
  },
  {
    name: "Notion",
    link: "/topic/notion/page/1",
  },
  {
    name: "Web Monetization",
    link: "/topic/web-monetization/page/1",
  },
];

const TopicsCloudCard = ({title="Hot topics"}) => {
  return (
    <div className="">
      <h3 className="font-semibold text-sm mb-5">{title}</h3>
      <div className="flex flex-wrap">
        {tags.map((tag, index) => {
          return <BigTag link={`${tag?.link || "/"}`}>{tag.name}</BigTag>;
        })}
      </div>
    </div>
  );
};
export default TopicsCloudCard;
