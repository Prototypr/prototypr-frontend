import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import Image from "next/image";
import Link from "next/link";

export default function PeoplePostPreview({

}) {
    const type = "toolbox"
    const coverImage = {
        "mediaItemUrl": "https://prototypr.io/wp-content/uploads/2020/09/Product-Header-_-Prototypr-Toolbox-768x576.png",
        "imgUrl": "https://prototypr.io/wp-content/uploads/2020/09/Product-Header-_-Prototypr-Toolbox.png",
        "logoNew": "https://prototypr.io/wp-content/uploads/2021/01/prototypr-media_sfo2_digitaloceanspaces_com_uN0f8-150x150."
    };
    const slug = "donaldng";
    const location = "China";
    const description = "Co-Founder and Product Design Coach at GEEK Up. Writing about Design, Business, and Personal Development."
    return (
        <div className="flex group flex-col pb-4 flex-grow h-full border border-gray-100 hover:shadow-lg transition-shadow duration-500 bg-white relative rounded-lg">
            <div className="relative rounded-lg cursor-pointer">
                <>
                    <CoverImage imageHeight="h-20" slug={"howuku"} title={"Howuku"} url={coverImage} type={"people"} />
                    <div className="absolute rounded-full bg-white -bottom-4 left-7">
                        {coverImage && coverImage.logoNew && (
                            <div
                                className="p-1 rounded-full border-gray-100 border bg-white -mt-4"
                                style={{ height: "44px", width: "44px" }}
                            >
                                <Image
                                    width="44"
                                    height="44"
                                    alt="Brand logo for external website's link"
                                    className="object-cover flex-shrink-0 shine rounded-full border border-2 border-gray-200 bg-white"
                                    src={coverImage.logoNew}
                                />
                            </div>
                        )}
                    </div>
                </>
            </div>
            <div className="px-3">
                <div className="relative pt-3 flex justify-between">
                    <div className="overflow-hidden mt-1">
                        <div><h1 className="text-base overflow-hidden heading mt-0 h-6 mt-0 text-gray-900" weight="medium">{"xxx"}</h1></div>
                            <div className="text-xs uppercase text-gray-700 mt-1">{location}</div>
                            <div className="text-sm text-gray-700 mt-2 clamp-2"><div dangerouslySetInnerHTML={{ __html: description }} /></div>
                    </div>
                </div>
                <div className="text-base text-gray-600 mt-2 overflow-hidden">
                    <div className="bg-gray-200 mr-2 text-gray-600 text-xs mb-1 px-2 py-1 rounded inline-block">#UX Design</div>
                    <div className="bg-gray-200 mr-2 text-gray-600 text-xs mb-1 px-2 py-1 rounded inline-block">#UI Design</div>
                    <div className="bg-gray-200 mr-2 text-gray-600 text-xs mb-1 px-2 py-1 rounded inline-block">#Branding</div>
                </div>
            </div>
        </div>
    );
}
