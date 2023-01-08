import Link from "next/link";
import Container from "@/components/container";

const featuredSections = [
    {
      tagline:'Inclusivity',
      title:'Localisation and Internationalisation',
      description:'Designing and building for different cultures.',
      image:'/static/images/localization.webp',
      slug:'localization'
    },
  {
    tagline:'Web Monetization',
    title:'Funding an Open Web',
    description:'Building an open, fairer web for everyone.',
    image:'/static/images/web-mon.webp',
    slug:'web-monetization'
  },
  {
    tagline:'The Source',
    title:'Open Web Letters',
    description:'Stories on building a better, more inclusive web.',
    image:'/static/images/proto_neurodiversity.webp',
    slug:'the-source'
  },
  ]
const TopicSpotlightSection = ({title='Open Web Spotlight', tagline}) =>{
    return(
        <Container maxWidth="max-w-[1320px]" >
        <h2 className="text-xl font-semibold mt-1">{title} {tagline?<span className="text-gray-400">{tagline}</span>:''}</h2>
        <div className="mt-6 rounded-xl grid grid-cols-1 gap-y-6 gap-x-6 md:gap-y-8 md:gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
                {featuredSections.map((section, i) => (
                  <Link
                  href={`/posts/${section.slug}/page/1`}>
                  <div className="flex flex-col">
                    <img className="w-full h-[212px] object-cover rounded-xl" src={section.image}/>
                    <h4 className="text-xs text-gray-500 uppercase font-medium mt-3">{section.tagline}</h4>
                    <h3 className="text-xl font-medium mt-1">{section.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{section.description}</p>
                  </div>
                  </Link>
                ))}
        </div>
        </Container>
    )
}
export default TopicSpotlightSection