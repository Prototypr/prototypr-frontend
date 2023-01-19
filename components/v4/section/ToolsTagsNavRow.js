import Container from "@/components/container";
// import BigTag from "@/components/v4/tag/BigTag";
import { GiantPillTag } from "../tag/GiantTag";
import ALL_SLUGS_GROUPS from "@/lib/menus/allTools";

const ToolsTagsNavRow = ({ tags, active }) => {
  return (
      <div className="flex flex-wrap gap-3 bg-white px-8 py-10 rounded-[30px]">
        <GiantPillTag active={active == "All"} link={`/toolbox/page/1`}>
          All
        </GiantPillTag>
        {ALL_SLUGS_GROUPS.map((tag, index) => {
          return (
            <>
              {tag.moreLink ? (
                <GiantPillTag
                  active={active == tag.title}
                  link={`${tag?.moreLink?.url || "/"}`}
                >
                  {tag.title}
                </GiantPillTag>
              ) : tag.subItems ? (
                tag.subItems.map((tag, index) => {
                  return (
                    <GiantPillTag
                      active={active == tag.title}
                      link={`/toolbox/${tag?.tags[0]}/page/1`}
                    >
                      {tag.title}
                    </GiantPillTag>
                  );
                })
              ) : (
                ""
              )}
            </>
          );
        })}
      </div>
  );
};
export default ToolsTagsNavRow;
