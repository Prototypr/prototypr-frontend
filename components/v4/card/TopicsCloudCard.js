import BigTag from "@/components/v4/tag/BigTag";
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
    name: "Open Source",
    link: "/posts/open-source/page/1",
  },
  {
    name: "Branding",
    link: "/posts/branding/page/1",
  },
  {
    name: "UI",
    link: "/posts/ui/page/1",
  },
  {
    name: "Figma",
    link: "/posts/figma/page/1",
  },
  {
    name: "User Research",
    link: "/posts/ui/page/1",
  },
  {
    name: "Notion",
    link: "/posts/notion/page/1",
  },
  {
    name: "Web Monetization",
    link: "/posts/web-monetization/page/1",
  },
];

const TopicsCloudCard = () => {
  return (
    <div className="font-inter">
      <h3 className="font-semibold text-sm mb-5">Hot Topics</h3>
      <div className="flex flex-wrap">
        {tags.map((tag, index) => {
          return <BigTag link={`${tag?.link || "/"}`}>{tag.name}</BigTag>;
        })}
      </div>
    </div>
  );
};
export default TopicsCloudCard;
