import Container  from "@/components/container"
import SignupHomepage from "@/components/newsletter/SignupHomepage"

const NewsletterSection = ({title,padding}) =>{

    return(
        <Container padding={padding} maxWidth="max-w-[1320px]">
            <div className="mt-8 lg:px-0 lg:mt-0">
            <div
            className="w-full relative flex h-full bg-[#eef2ff] w-full lg:mt-8 rounded-3xl p-6"
            >
            <div className="max-w-xl lg:max-w-xl z-20">
                <h3 className="text-xl tracking-tight lg:text-3xl mb-4 font-inter text-black/90 font-semibold">{title?title:<>
                    Get hand-picked stories <div className="text-underline inline">every week</div>
                </>}</h3>
                <p className="font-inter mb-4 text-base text-gray-900 text-opacity-80">Join <span className="text-black/80 font-semibold">25,000+ creatives</span> who enjoy a regular dose of inspiration and motivation, delivered to your inbox every week.</p>
                <SignupHomepage/>
            </div>
            <div style={{backgroundPosition:'10px 10px'}} className="absolute w-full h-full rounded-3xl bg-[url('/static/images/toolbox/gridsquare.svg')] absolute inset-0 [mask-image:linear-gradient(0deg,#eef2ff,rgba(238,242,255,0.8))]"/>
            {/* <img src='/static/images/toolbox/white-grid-opacity-1.svg' className="rounded-3xl invert-1 opacity absolute w-full h-full object-cover opacity-50 top-0 left-0"/> */}
            {/* <img src='/static/images/toolbox/white-grid-opacity-1.svg' className="rounded-3xl invert-1 opacity absolute w-full h-full object-cover opacity-50 top-0 left-0"/> */}
            <div>
            <img
                className="hidden sm:block sm:w-[220px] 2md:w-[300px] lg:w-[300px] top-0 mt-8 md:-mt-6 absolute right-0 xl:mr-32"
                src={
                    // "https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/7432cc558c73394df5d2c21a3ee18cd5.png?updated_at=2022-12-14T17:59:46.805Z"
                    "https://prototyprio.gumlet.io/strapi/7432cc558c73394df5d2c21a3ee18cd5.png?updated_at=2022-12-14T17:59:46.805Z"
                }
                />
            </div>
            </div>
            </div>
        </Container>
    )
}

export default NewsletterSection