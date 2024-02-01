import Container  from "@/components/container"
import SignupHomepage from "@/components/newsletter/SignupHomepage"

const NewsletterSection = ({title,padding}) =>{

    return(
        <Container padding={padding} maxWidth="max-w-[1320px]">
            <div className="mt-8 lg:px-0 lg:mt-0">
            <div
            className="w-full shadow-md relative flex h-full bg-gray-100 w-full lg:mt-8 rounded-3xl p-6"
            >
            <div className="max-w-xl lg:max-w-xl">
                <h3 className="text-xl lg:text-3xl mb-2 font-inter text-black/80 font-semibold">{title?title:'The best design articles, every week'}</h3>
                <p className="font-inter mb-4 text-base text-gray-900 text-opacity-80">Join 25,000+ creatives who enjoy a regular dose of inspiration and motivation, delivered to your inbox every week.</p>
                <SignupHomepage/>
            </div>
            <div>
            <img
                className="hidden sm:block sm:w-[220px] 2md:w-[344px] lg:w-[350px] top-0 mt-8 md:-mt-6 absolute right-0 xl:mr-32"
                src={
                    "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/7432cc558c73394df5d2c21a3ee18cd5.png?updated_at=2022-12-14T17:59:46.805Z"
                }
                />
            </div>
            </div>
            </div>
        </Container>
    )
}

export default NewsletterSection