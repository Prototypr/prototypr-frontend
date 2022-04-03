


export default function Author({avatar = "", author = ""}) {
    return (
        <>
            <div style={{backgroundImage: `url(${avatar})`}} className="w-9 h-9 rounded-full bg-100 bg-no-repeat bg-center mr-3"></div>
            <div className="font-medium text-base leading-normal text-gray-1">{author}</div>
        </>
    )
}