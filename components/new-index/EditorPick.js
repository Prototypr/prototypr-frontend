
import React from "react";
import Image from "next/image";
export default function EditorPick({post = {}}) {
    const postItem = post?.attributes
    // console.log('postItem********' + JSON.stringify(postItem))
    const { title = "", excerpt, slug, date, tags, legacyFeaturedImage = null, author = null } = postItem
    const tagArr = tags.data
    return (
        <section className="pb-10">
            <h3 className="text-4xl text-title-1 font-bold leading-6 tracking-wide mb-9">Editor’s picks</h3>
            <div className="rounded-lg bg-white w-full p-10 flex">
                <div className="flex-1">
                    <Image 
                        width={800}
                        height={430}
                        className="object-cover"
                        alt="img"
                        src={
                            legacyFeaturedImage?.mediaItemUrl
                        }
                    />
                </div>
                <div className="w-9/20 ml-10">
                    <div className="flex mb-5">
                        <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-1">
                            # {tagArr && tagArr.length ? tagArr[0].attributes.slug : "design"}
                        </div>
                    </div>
                    <p className="text-2xl font-bold leading-tight text-paragraph-1 w-4/5">{title}</p>
                    <div 
                        className="text-base font-medium text-gray-3 leading-normal mt-4 clamp-2 overflow-hidden text-ellipsis"
                        dangerouslySetInnerHTML={{ __html: excerpt }}
                    ></div>
                    
                    <div className="flex mt-6 items-center">
                        <div className="w-11 h-11 rounded-full bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${author?.data?.attributes?.avatar})`}}></div>
                        <div className="font-medium text-base ml-3 text-gray-1">{author?.data?.attributes?.displayName}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}