import Image from "next/image";
import Link from "next/link";
import {gradient} from "@/lib/profile-page/profile-page.js"

export default function PeoplePostPreview({
    title,
    slug,
    legacyAvatar = "",
    skills = "",
    bio = "",
    location = "",
    avatar = ""
}) {
    let skillArr = [];
    if (skills && skills !== "") {
        skillArr = skills.split(",");
    }
    const grad = gradient(title, 'horizontal')
    const img = avatar ?avatar: legacyAvatar
    return (
            <Link href={`/people/${slug}`}>
        <div className="flex group cursor-pointer flex-col pb-4 flex-grow h-full border border-1 border-gray-100 hover:shadow-lg transition-shadow duration-500 bg-white relative rounded-lg">
            <div className="relative rounded-lg cursor-pointer">
                <>
                <figure className={`relative w-full h-20 overflow-hidden rounded-t-lg  overflow-hidden`}>
                        <div
                        style={{ background: grad}}
                        className="absolute w-full h-full object-cover rounded-lg rounded-b-none cursor-pointer">
                        </div>
                    </figure>
                    <div className="absolute rounded-full bg-white -bottom-5 left-4">
                        {img && (
                            <div
                                className="rounded-full transform group-hover:scale-110 transition duration-700 ease-out  border-white border border-2 bg-white -mt-2 shadow"
                                style={{ height: "44px", width: "44px" }}
                            >
                                <Image
                                    width="44"
                                    height="44"
                                    alt={`Avatar for ${title}`}
                                    className="object-cover flex-shrink-0 shine rounded-full bg-white"
                                    src={img}
                                />
                            </div>
                        )}
                    </div>
                </>
            </div>
            <div className="px-4">
                <div className="relative pt-7 flex justify-between">
                    <div className="overflow-hidden mt-1">
                        <div><h1 className="text-base overflow-hidden heading mt-0 h-6 mt-0 text-gray-900" weight="medium">{title}</h1></div>
                            <div className="text-xs uppercase text-gray-700 mt-1">{location}</div>
                            <div className="text-sm text-gray-700 mt-2 clamp-2"><div dangerouslySetInnerHTML={{ __html: bio }} /></div>
                    </div>
                </div>
                <div className="text-base text-gray-600 mt-3 h-7 overflow-hidden">
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
            </Link>
    );
}
