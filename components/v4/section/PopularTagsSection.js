import Container from "@/components/container"
import CategoriesIconCard from "@/components/v4/card/CategoriesIconCard";

const PopularTagsSection = ({popularTags}) =>{
    return(
        <div className="rounded-xl grid grid-cols-1 gap-y-6 gap-x-6 md:gap-y-8 md:gap-x-8 sm:grid-cols-2 xl:grid-cols-4">
                {popularTags.map((topic, i) => (
                 <CategoriesIconCard withBackground={true} key={i} index={i} topic={topic}/>
                ))}
              </div>
    )
}

export default PopularTagsSection