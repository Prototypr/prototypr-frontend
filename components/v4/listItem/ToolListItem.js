import gumletLoader from "@/components/new-index/gumletLoader";
import Image from "next/image";

const ToolListItem = ({title, legacyFeaturedImage, slug, showLogo}) =>{

    return(
        <div className="flex flex-row my-2.5 rounded-lg">
        {legacyFeaturedImage?.logoNew && showLogo ? (
            <div
            style={{ flex: "0 0 3em" }}
            className="w-12 h-12 mr-2 relative border border-opacity-10 border-black rounded-lg overflow-hidden"
            >
            <Image
                tabIndex={0}
                loader={gumletLoader}
                layout="fill"
                objectFit="cover"
                src={legacyFeaturedImage?.logoNew}
                className="object-cover"
                alt="Author profile picture"
            />
            </div>
        ) : (
            ""
        )}
        <div className="flex flex-col ml-1 grid gap-1 justify-center">
            <p className="overflow-hidden line-clamp-2 inline  text-sm">
            {title}
            </p>
        </div>
        </div>
    )

}
export default ToolListItem