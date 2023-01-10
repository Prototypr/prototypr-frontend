import Container from "@/components/container";
// import BigTag from "@/components/v4/tag/BigTag";
import GiantTag from "../tag/GiantTag";
import ALL_SLUGS_GROUPS from "@/lib/menus/allTools";

const ToolsTagsNavRow = ({tags, active}) => {
  return (
    <Container maxWidth="max-w-[1320px]">
      <div className="flex flex-wrap">
        {ALL_SLUGS_GROUPS.map((tag, index) => {
          
          return (
            <>
            {tag.subItems?
              <GiantTag active={active==tag.title} link={`${tag?.moreLink?.url || "/"}`}>{tag.title}</GiantTag>
            :''}
            </>)
        })}
      </div>
    </Container>
  );
};
export default ToolsTagsNavRow;
