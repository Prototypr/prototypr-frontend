import Container from "@/components/container";
// import BigTag from "@/components/v4/tag/BigTag";
import GiantTag from "../tag/GiantTag";
import ALL_SLUGS_GROUPS from "@/lib/menus/allTools";

const ToolsTagsNavRow = ({tags, active}) => {
  return (
    <Container maxWidth="max-w-[1320px]">
      <div className="flex flex-wrap">
      <GiantTag active={active=='All'} link={`/toolbox/page/1`}>All</GiantTag>
        {ALL_SLUGS_GROUPS.map((tag, index) => {
          
          return (
            <>
            {tag.moreLink?
              <GiantTag active={active==tag.title} link={`${tag?.moreLink?.url || "/"}`}>{tag.title}</GiantTag>
            :
            tag.subItems?tag.subItems.map((tag,index)=>{
              return(
                <>
                <GiantTag active={active==tag.title} link={`/toolbox/${tag?.tags[0]}/page/1`}>{tag.title}</GiantTag>
                </>
              )
            })
            :''}
            </>)
        })}
      </div>
    </Container>
  );
};
export default ToolsTagsNavRow;
