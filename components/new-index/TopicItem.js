



import Author from './Author'
export default function TopicItem({topic = {}}) {

    const { title = "", excerpt, slug, date, tags, legacyFeaturedImage = null, author = null } = topic
    const tagArr = tags.data

    return (
        <div className="grid-cols-1 p-3 flex cursor-pointer">
            <div style={{width: "146px", height: "146px",backgroundImage: `url(${legacyFeaturedImage?.thumb})`}} className="rounded-lg mr-4 bg-100 bg-no-repeat"></div>
            <div className="flex flex-col flex-1">
                <div className="flex">
                    <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2">
                        # {
                            tagArr && tagArr.length ? tagArr[0].attributes.slug : "design"
                        }
                    </div>
                    {/* <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2"># product design</div> */}
                </div>
                <h4 className="text-black-1 font-bold text-lg leading-normal mt-2">{title}</h4>
                <div className="flex items-center mt-4">
                    <Author 
                        avatar={author?.data?.attributes?.avatar}
                        author={author?.data?.attributes?.displayName}
                    />
                </div>
            </div>
        </div>
    )
}