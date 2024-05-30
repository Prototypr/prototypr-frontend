import Container  from "@/components/container"
import SignupHomepage from "@/components/newsletter/SignupHomepage"

const NewsletterPageHero = ({title,padding}) =>{

    return(
        <Container padding={padding} maxWidth="max-w-[1320px]">
            <div className="lg:px-0 lg:mt-0">
            <div
            className="w-full relative flex h-full w-full rounded-3xl p-6 pt-8"
            >
            <div className="z-20 max-w-md xl:max-w-full">
                <h3 className="text-4xl tracking-tighter lg:text-5xl mb-10 leading-snug  text-black/90 font-semibold">{title?title:<>
                    Weekly tools and stories to <br className="hidden xl:block"/> shape <div className="text-underline inline">every idea</div>
                </>}</h3>
                <SignupHomepage/>
                <p className=" mb-4 mt-10 text-lg text-gray-900 text-opacity-80 max-w-xl">Join <span className="text-black/80 bg-indigo-200/70">25,000+ creatives</span> and receive our carefully curated digest of stories, tools and links, delivered to your inbox:</p>
                <p className="text-lg text-gray-900/80">
                    <ul className="list-disc pl-10">
                        <li className="mt-2.5">Top articles of the week</li>
                        <li className="mt-2.5">The best tools, apps and resources</li>
                        <li className="mt-2.5">Thought-provoking interviews</li>
                        <li className="mt-2.5">Carefully curated by humans</li>
                    </ul>
                </p>
            </div>
            {/* <img src='/static/images/toolbox/squares.svg' className="rounded-3xl opacity absolute w-full h-full object-cover top-0 left-0"/> */}
            <div>
            <img
                className="z-30 hidden 2md:block sm:w-[200px] drop-shadow-lg 2md:w-[304px] lg:w-[400px] top-0 absolute right-0 xl:mr-32"
                src={
                    "https://prototyprio.gumlet.io/strapi/c8452fffe5ddee55705e7e9de63b47e7.png?w=400&q=75&format=avif&compress=true&dpr=1"
                }
                />
            </div>
            </div>
            </div>
        </Container>
    )
}

export default NewsletterPageHero