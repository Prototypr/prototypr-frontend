// import Container from "@/components/container"
// import CategoriesIconCard from "@/components/v4/card/CategoriesIconCard";
import { ArrowRight } from "phosphor-react";
import JumboTag from "../card/JumboTag";
import Link from "next/link";

const JumboTagsSection = ({popularTags}) =>{
    return(
    <div className="rounded-xl grid gap-y-6 gap-x-6 md:gap-y-8 md:gap-x-12 grid-cols-12">
             <div className="col-span-12 ">
                    {/* <h2 className="text-xl mb-6 font-bold text-gray-900">
                Browse by <span className="text-gray-500">topic</span>
                </h2> */}
                <div className="grid grid-cols-12 xs:gap-4 md:gap-6 lg:gap-12">
                {/* <div className="col-span-6">
                            <Link href={`/topics`}>
                        <div className="rounded-2xl h-[210px] bg-gradient-to-r from-blue-800/90 to-blue-800/80">
                            <div className={`flex h-full relative rounded-2xl w-full flex-col justify-center overflow-hidden p-5 py-0 md:py-8 md:p-8 text-white`}>
                            <img className="absolute right-0 top-0 w-2/3 h-full object-cover opacity-70" src="/static/images/topicpattern.svg"/>
                            <div className="max-w-[264px] sm:max-w-[280px]">
                                <h3 className="text-2xl font-medium mt-1">Browse all topics</h3>
                                <p className="text-base text-gray-100 mt-1">See more categories, from Artificial Intelligence to Virtual Reality.</p>
                            </div>
                            </div>
                        </div>
                            </Link>
                    </div> */}
                    {popularTags.slice(0,6).map((topic, i) => (
                    <JumboTag withBackground={true} key={i} index={i} topic={topic}/>
                    ))}

                    <div className="mt-4 md:mt-0 col-span-12 xs:col-span-6 md:col-span-4 lg:col-span-3">
                            <Link href={`/topics`}>
                        <div className="rounded-2xl shadow-sm h-[180px] bg-gradient-to-r from-blue-800/90 to-blue-800/80">
                            <div className={`flex h-full relative rounded-2xl w-full flex-col justify-center overflow-hidden p-5 py-0 md:py-8 md:p-8 text-white`}>
                            <img className="absolute left-0 top-0 w-full h-full object-cover opacity-70" src="/static/images/topicpattern.svg"/>
                            </div>
                        </div>
                        <div className="flex justify-between p-2">
                        <div className="capitalize text-lg overflow-hidden line-clamp-1 inline font-medium font-inter">
                            All topics
                        </div>
                        <div className="bg-blue-500 relative flex justify-center my-auto h-6 w-6 rounded-full">
                            <ArrowRight weight="bold" size={14} color="rgba(255,255,255,0.8)" className="my-auto"/>
                        </div>
                        </div>
                            </Link>
                    </div>
                    
                    {/* {popularTags.slice(2,6).map((topic, i) => (
                    <JumboTag withBackground={true} key={i} index={i} topic={topic}/>
                    ))} */}
                </div>
            </div>
           
           
        </div>
        )
}

export default JumboTagsSection