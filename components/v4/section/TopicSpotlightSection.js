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
    description:'A new way to earn money on the web.',
    image:'/static/images/web-mon.webp',
    slug:'web-monetization'
  },
  {
    tagline:'Open Web Roundups',
    title:'The Source',
    description:'Stories on building a better, more inclusive web.',
    image:'/static/images/proto_neurodiversity.webp',
    slug:'the-source'
  },
  ]
const TopicSpotlightSection = ({title='Topic Spotlight', tagline, headingSize}) =>{
    return(
        <Container maxWidth="max-w-[1320px]" >
          <div className="bg-white p-6 md:p-10 rounded-xl shadow-sm">
          <h2 className={`${headingSize?headingSize:'text-xl mb-6'} font-semibold`}>{title} {tagline?<span className="text-gray-500">{tagline}</span>:''}</h2>
          <div className="rounded-xl grid grid-cols-1 gap-y-6 gap-x-6 md:gap-y-8 md:gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
                  {featuredSections.map((section, i) => (
                    <Link
                    href={`/posts/${section.slug}/page/1`}>
                    <div className="flex flex-col">
                      <img className="w-full h-[190px] object-cover rounded-xl" src={section.image}/>
                      <h4 className="text-xs text-gray-500 uppercase font-medium mt-3">{section.tagline}</h4>
                      <h3 className="text-xl font-medium mt-1">{section.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{section.description}</p>
                    </div>
                    </Link>
                  ))}
          </div>
          </div>
        </Container>
    )
}
export default TopicSpotlightSection