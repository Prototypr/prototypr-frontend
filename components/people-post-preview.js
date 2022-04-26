import Avatar from "./avatar";
import Date from "./date";
import Image from "next/image";
import Link from "next/link";
import {gradient} from "@/lib/profile-page/profile-page.js"
export default function PeoplePostPreview({
    title,
    slug,
    legacyAvatar = "",
    skills = "",
    bio = "",
    location = ""
}) {
    let skillArr = [];
    if (skills && skills !== "") {
        skillArr = skills.split(",");
    }
    return (
        <div className="flex group flex-col pb-4 flex-grow h-full border border-gray-100 hover:shadow-lg transition-shadow duration-500 bg-white relative rounded-lg">
            <div className="relative rounded-lg cursor-pointer">
                <>
                <figure className={`relative w-full h-20 overflow-hidden rounded-t-lg  transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden`}>
                    <Link href={`/people/${slug}`}>
                        <div
                        style={{ background: gradient(title, 'horizontal')}}
                        className="absolute w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition duration-700 ease-out cursor-pointer">
                        </div>
                    </Link>
                    </figure>
                    <div className="absolute rounded-full bg-white -bottom-4 left-7">
                        {legacyAvatar && (
                            <div
                                className="p-1 rounded-full border-gray-100 border bg-white -mt-4"
                                style={{ height: "44px", width: "44px" }}
                            >
                                <Image
                                    width="44"
                                    height="44"
                                    alt="Brand logo for external website's link"
                                    className="object-cover flex-shrink-0 shine rounded-full border border-2 border-gray-200 bg-white"
                                    src={legacyAvatar}
                                />
                            </div>
                        )}
                    </div>
                </>
            </div>
            <div className="px-3">
                <div className="relative pt-3 flex justify-between">
                    <div className="overflow-hidden mt-1">
                        <div><h1 className="text-base overflow-hidden heading mt-0 h-6 mt-0 text-gray-900" weight="medium">{title}</h1></div>
                            <div className="text-xs uppercase text-gray-700 mt-1">{location}</div>
                            <div className="text-sm text-gray-700 mt-2 clamp-2"><div dangerouslySetInnerHTML={{ __html: bio }} /></div>
                    </div>
                </div>
                <div className="text-base text-gray-600 mt-2 overflow-hidden">
                    {
                        skillArr.length ? skillArr.map((skill) => {
                            return (
                                <div className="bg-gray-200 mr-2 text-gray-600 text-xs mb-1 px-2 py-1 rounded inline-block"># {skill}</div>
                            )
                        }): null
                    }
                </div>
            </div>
        </div>
    );
}
