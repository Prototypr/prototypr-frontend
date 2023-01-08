import Button from "@/components/Primitives/Button"
import Container from "@/components/container"

const SponsorBannerFull = () =>{
    return(
        <Container maxWidth="max-w-[1320px]">
             <a target="_blank" href="https://letter.so/?ref=prototypr&utm=home_banner">
            <div className="bg-indigo-500 rounded-2xl">
            <div className="mx-auto max-w-7xl p-4 px-2">
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center">
                <span className="flex rounded-xl bg-gray-100 border border-gray-200 md:p-1">
                    <img src={`/static/images/placeholder/letter-logo.png`}  className="h-10 w-10 rounded-xl text-white" aria-hidden="true" />
                    <div className="p-2 hidden md:block">
                        <img src={`/static/images/logo-small.svg`}  className="ml-2 h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {/* <MegaphoneIcon className="h-6 w-6 text-white" aria-hidden="true" /> */}
                </span>
                <p className="ml-3 truncate font-medium text-white">
                    {/* <span className="md:hidden">An email tool for creators!</span> */}
                    <div className="hidden md:inline">Prototypr is supported by Letter, a newsletter builder for creators!</div>
                    <div className="inline md:hidden">Supported by Letter</div>
                </p>
                </div>
                <div className="order-3 flex-shrink-0">
                    <Button variant="cancel" className="text-white">
                        Try it today {'->'}
                    </Button>
                </div>
             
            </div>
            </div>
        </div>
        </a>
        </Container>
    )
}
export default SponsorBannerFull