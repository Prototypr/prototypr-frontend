import Link from "next/link";
import Button from "@/components/Primitives/Button";
import Container from "@/components/container";
// import gumletLoader from "../../new-index/gumletLoader";
// import Image from "next/image";
import { usePlausible } from "next-plausible";
// import CardDeckRow from "@/components/v4/layout/CardDeckRow";
import ParticlesContainer from "@/components/v4/particles/ParticlesContainer";
// import SponsorBubble from "@/components/v4/particles/SponsorBubble";

const IntroBanner = ({ tools, sponsor }) => {
  const plausible = usePlausible();

  return (
    <Container maxWidth="max-w-[1320px]">
      <div
        // style={{background: 'linear-gradient(179.7deg, #040444, rgb(3 3 63))'}}
        className="flex bg-blue-700 text-white text-left text-gray-800 overflow-hidden overflow-x-scroll border border-gray-100 md:overflow-x-hidden rounded rounded-3xl"
      >
        <div className="w-full z-10  p-0 2md:w-full relative flex flex-col">
          {/* <SponsorBubble/> */}
          <div 
          onClick={(e)=>{e.preventDefault();e.stopProgagation}}
          className="relative pointer-events-auto p-4 text-white rounded-3xl z-10" style={{width:'fit-content'}}>
          {/* <div
            className="h-7 text-base font-semibold leading-7"
            aria-hidden="true"
          >
            A better world. Designed by you.
          </div> */}
          <div className="z-10">
            <h1 className="max-w-[32rem] backdrop- z-10 rounded-2xl p-2 mt-4 text-4xl font-black tracking-tight sm:text-5xl leading-tight">
                Design and build the future, together.
            </h1>
            <p className="mt-4 rounded-2xl p-2 backdrop- text-gray-50 max-w-[32rem]">
            Prototypr is an open source publishing platform for creators.<br/>A place to learn, discover, and experiment with new technology.

            </p>
            <div className="flex flex-row justify-start mt-4">
                <Link href="/onboard">
                <Button className="bg-white text-blue-600" variant="confirmRounded">
                    Sign up
                </Button>
                </Link>
                {/* <Button variant="confirmRoundedLight">
                Sign up
                </Button> */}
                {/* <Button className="ml-3" variant="ghost">Learn more</Button> */}
          </div>
          </div>
          <div style={{zIndex:-1}} className="bg-gradient-to-r from-[#0a2254] to-transparent w-full absolute h-full top-0 left-0"/>

          </div>
           <div className="w-full h-full">
            <ParticlesContainer tools={tools} sponsor={sponsor} />
          </div>
        </div>
        {/* <div className="hidden 2md:block w-1/2 relative h-full overflow-visible">
          <div className="absolute left-0 top-0 -mt-[3.3rem] w-[110%] py-20 overflow-x-auto pl-20 -ml-16">
            <CardDeckRow tools={tools} sponsor={sponsor} />
          </div>
        </div> */}
      
      </div>
    </Container>
  );
};
export default IntroBanner;
