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
        className="flex bg-[#EAE9F5] text-gray-800 overflow-hidden overflow-x-scroll bg-opacity-60 border border-gray-100 md:overflow-x-hidden rounded rounded-3xl"
      >
        <div className="w-full z-10  p-2 2md:w-full relative flex flex-col">
          {/* <SponsorBubble/> */}
          <div 
          onClick={(e)=>{e.preventDefault();e.stopProgagation}}
          className="bg-[#EAE9F5] pointer-events-auto bg-opacity-60 backdrop-blur-sm p-4 rounded-3xl z-10" style={{width:'fit-content'}}>
          <div
            className="h-7 text-base font-semibold leading-7"
            aria-hidden="true"
          >
            A better world. Designed by you.
          </div>
          <h1 className="max-w-[32rem] mt-4 text-4xl font-black tracking-tight sm:text-5xl leading-tight">
            Design and build the future, together.
          </h1>
          <p className="mt-4 text-gray-600 max-w-[32rem]">
            We're an open-source platform where creative people come together.
            Prototypr is a canvas for creativity, curiosity and openness where
            you can bring new ideas to spark a brighter future.
          </p>
          <div className="flex mt-4">
            <Link href="/onboard">
              <Button className="" variant="confirmRounded">
                Sign up
              </Button>
            </Link>
            {/* <Button variant="confirmRoundedLight">
              Sign up
            </Button> */}
            {/* <Button className="ml-3" variant="ghost">Learn more</Button> */}
          </div>
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
