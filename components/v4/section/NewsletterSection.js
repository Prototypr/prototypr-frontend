import Container  from "@/components/container"
import SignupHomepage from "@/components/newsletter/SignupHomepage"

const NewsletterSection = () =>{

    return(
        <Container maxWidth="max-w-[1320px]">
            <div className=" sm:mt-8 lg:px-0 lg:mt-0">
            <div
            className="w-full relative flex h-full bg-blue-100 w-full lg:mt-8 rounded-[16px] p-6"
            >
            <div className="max-w-xl lg:max-w-xl">
                <h3 className="text-xl lg:text-3xl mb-2 font-inter text-black font-bold">The best design articles, every week</h3>
                <p className="font-inter mb-4 text-base leading-[24px] text-black text-opacity-70">Join 25,000+ creatives who enjoy a regular dose of inspiration and motivation, delivered to your inbox every Tuesday.</p>
                <SignupHomepage/>
            </div>
            <div>
            <img
                className="hidden sm:block sm:w-[220px] 2md:w-[344px] lg:w-[354px] top-0 mt-8 md:-mt-6 absolute right-0 xl:mr-32"
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