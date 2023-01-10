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
        className="grid grid-cols-12 justify-stretch bg-blue-800 bg-opacity-90 text-gray-800 overflow-hidden overflow-x-scroll border border-gray-100 md:overflow-x-hidden rounded rounded-3xl"
      >
        <div className="md:col-span-5 relative col-span-12 font-inter p-2  relative flex flex-col">
          {/* <div className="absolute w-[146%] bg-blue-800 h-[180%] -mt-[8%] -ml-[46%] left-0" style={{borderRadius:'100%'}}/> */}
          {/* <SponsorBubble/> */}
          <div 
          onClick={(e)=>{e.preventDefault();e.stopProgagation}}
          className="pointer-events-auto p-5 rounded-3xl z-10" style={{width:'fit-content'}}>
          <div
            className="h-7 text-base text-blue-100 font-semibold leading-7"
            aria-hidden="true"
          >
            A better world. Designed by you.
          </div>
          <h1 className="max-w-[32rem] text-white mt-4 text-4xl font-semibold tracking-tight sm:text-5xl leading-tight">
            Design and build the future, together.
          </h1>
          <p className="mt-4 text-gray-100 max-w-[32rem]">
            Prototypr is an open source publishing platform for creators. A place to learn, discover, and experiment with new technology.
          </p>
          <div className="flex mt-4">
            <Link href="/early-access">
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
        </div>
           <div className="col-span-7 hidden md:block relative h-full">
            <ParticlesContainer tools={tools} sponsor={sponsor} />
                      <div className="absolute w-[146%] bg-white bg-opacity-10 h-[180%] -mt-[8%] -mr-[46%] right-0" style={{borderRadius:'100%'}}/>

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
