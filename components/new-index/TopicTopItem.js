
import Author from './Author'
export default function TopicTopItem({}) {

    return (
        <div className="grid-cols-1 bg-white p-6 flex cursor-pointer">
            <div style={{width: "284px", height: "297px",border:"1px solid red"}} className="mr-6 rounded-lg"></div>
            <div className="flex flex-col flex-1">
                <div className="flex">
                    <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2">#product design</div>
                    <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-2">#data</div>
                </div>
                <h4 className="text-black-1 font-bold text-lg leading-normal mt-2">Designing with data — 4 principles and a cheat sheet</h4>
                <p className="mt-3 text-gray-3 font-medium text-base leading-normal overflow-hidden text-ellipsis clamp-2">Guiding leadership values for 2022. Excellent leadership bla bla for testing ellipse</p>
                <div className="flex items-center mt-5">
                    <Author />
                    {/* <div style={{width: "36px",height: "36px",border: "1px solid red"}} className="rounded-full mr-3"></div>
                    <div className="font-medium text-base leading-normal text-gray-1">Justin Rhiel Madsen</div> */}
                </div>
            </div>
        </div>
    )
}