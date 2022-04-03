
import Author from './Author'
export default function TopicTopItem({topic = {}}) {

    const { title = "", excerpt, slug, date, tags, legacyFeaturedImage = null, author = null } = topic
    const tagArr = tags.data

    return (
        <div className="grid-cols-1 bg-white p-6 flex cursor-pointer">
            <div style={{width: "284px", height: "297px",backgroundImage: `url(${legacyFeaturedImage?.thumb})`}} className="mr-6 rounded-lg bg-100 bg-no-repeat"></div>
            <div className="flex flex-col flex-1">
                <div className="flex">
                    <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2">
                    # {
                        tagArr && tagArr.length ? tagArr[0].attributes.slug : "design"
                    }
                    </div>
                    {/* <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2">#data</div> */}
                </div>
                <h4 className="text-black-1 font-bold text-lg leading-normal mt-2">{title}</h4>
                <div className="mt-3 text-gray-3 font-medium text-base leading-normal overflow-hidden text-ellipsis clamp-2" dangerouslySetInnerHTML={{ __html: excerpt }}>
                </div>
                <div className="flex items-center mt-5">
                    <Author 
                        avatar={author?.data?.attributes?.avatar}
                        author={author?.data?.attributes?.displayName}
                    />
                    {/* <div style={{width: "36px",height: "36px",border: "1px solid red"}} className="rounded-full mr-3"></div>
                    <div className="font-medium text-base leading-normal text-gray-1">Justin Rhiel Madsen</div> */}
                </div>
            </div>
        </div>
    )
}