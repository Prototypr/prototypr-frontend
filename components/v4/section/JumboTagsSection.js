import Container from "@/components/container"
import CategoriesIconCard from "@/components/v4/card/CategoriesIconCard";
import JumboTags from "../card/JumboTag";

const JumboTagsSection = ({popularTags}) =>{
    return(
        <div>
            <div className="flex">
                <div className="w-1/2 pr-6 rounded-xl grid grid-cols-1 gap-y-6 gap-x-6 md:gap-y-8 md:gap-x-8 sm:grid-cols-2 xl:grid-cols-1">
                        {popularTags.slice(1,5).map((topic, i) => (
                        <JumboTags withBackground={true} key={i} index={i} topic={topic}/>
                        ))}
                    </div>
                    <div className="w-1/2">
                        {popularTags.slice(0,1).map((topic, i) => (
                            <div className="p-6 col-span-2 h-[200px] bg-blue-600 rounded-xl">
                            <h1 className="text-xl">{topic?.name}</h1>
                            </div>
                        ))}
                    </div>
            </div>
            <div className="w-full pr-6 rounded-xl grid grid-cols-1 gap-y-6 gap-x-6 md:gap-y-8 md:gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
                        {popularTags.slice(5,8).map((topic, i) => (
                        <JumboTags withBackground={true} key={i} index={i} topic={topic}/>
                        ))}
                    </div>
        </div>
    )
}

export default JumboTagsSection