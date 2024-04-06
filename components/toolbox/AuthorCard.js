import Image from 'next/image'
import Link from 'next/link'
export default function AuthorCard({ author = {},title, avatar='' }) {

    let attributes = {};
    if (author.data && author.data.attributes) {
        //displayName firstName lastName avatar
        attributes = author.data.attributes
    }

    var username = attributes.username
    if(!username){
        username = (attributes.firstName ?attributes.firstName:'')+(attributes.lastName ?(' '+attributes.lastName):'')
    }
    const pic = attributes?.avatar?.data?.attributes?.url ? attributes.avatar.data.attributes.url:
    attributes?.legacyAvatar ? attributes.legacyAvatar
      :"https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png"
      
    return (
        <>
            <div className="md:mb-0 bg-white border-gray-300 block md:block rounded-lg">
                <Link href={`/people/${attributes?.slug}`}>
                    {/* <h1 tabIndex={0} className="text-sm font-medium mb-3">{title?title:attributes.title ? attributes.title : "Posted by"}</h1> */}
                    <div className="py-2 w-full relative flex">
                        <div className="relative mr-3">
                            <div className="w-16 h-16 rounded-full border border-1 overflow-hidden relative border-gray-100 shadow-sm">
                                {
                                    (pic) && <Image 
                                    tabIndex={0}
                                    layout="fill"
                                    objectFit="cover"
                                    src={pic}
                                    className="rounded-full " 
                                    alt="Author profile picture"/>
                                }
                            </div>
                        </div>

                        <div className="my-auto">
                            <p tabIndex={0} className="text-base cursor-pointer leading-5 font-semibold text-gray-800">
                                {username}
                            </p>
                            <p tabIndex={0} className="text-base">Editor</p>
                           {title? <h1 tabIndex={0} className="text-base mt-2">{title}</h1>:null}
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}