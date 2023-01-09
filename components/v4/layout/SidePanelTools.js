import Link from "next/link";
import ToolListItem from "@/components/v4/listItem/ToolListItem";

const SidePanelTools = ({list}) =>{

    return(

        <div className="flex rounded-lg flex-col gap-0 px-2 mt-8">
        <div className="flex flex-row justify-between items-baseline">
          <h3 className="font-inter my-0.5 font-bold text-gray-800 text-sm">
            Latest Tools
          </h3>
            {/* <div className="flex flex-row justify-between items-baseline">
                    <h3 className="font-inter my-0.5 font-bold text-gray-500 text-sm">
                      Latest Tools
                    </h3>
                    <Link
                      href={"/toolbox"}
                      className="font-inter text-xs font-semibold text-gray-800 cursor-pointer"
                    >
                      See all
                    </Link>
                  </div> */}
        </div>
        <div className="flex flex-col grid my-2">
          {list.map((item, i) => {
             const { title, legacyFeaturedImage, tags, slug } =
             item.attributes;
            return (
              <ToolListItem 
              slug={slug}
              index={i}
              title={title} 
              legacyFeaturedImage={legacyFeaturedImage} 
              tags={tags}
              showLogo={true}/>
            );
          })}

          <Link href={"/toolbox"}>
            <div className="font-inter font-medium mt-3 text-gray-600 cursor-pointer text-xs">{`See All ->`}</div>
          </Link>
        </div>
      </div>

    )
}

export default SidePanelTools