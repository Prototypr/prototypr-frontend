



import Author from './Author'
export default function TopicItem({}) {

    return (
        <div className="grid-cols-1 p-3 flex cursor-pointer">
            <div style={{width: "146px", height: "146px", border:"1px solid blue"}} className="rounded-lg mr-4"></div>
            <div className="flex flex-col flex-1">
                <div className="flex">
                    <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2"># illustration</div>
                    <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2"># product design</div>
                </div>
                <h4 className="text-black-1 font-bold text-lg leading-normal mt-2">What I learned as an AR/VR Teaching Assistant to 150 students</h4>
                <div className="flex items-center mt-4">
                    <Author />
                </div>
            </div>
        </div>
    )
}