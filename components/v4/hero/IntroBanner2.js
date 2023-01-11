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
    <Container maxWidth="max-w-[1320px] relative">
      <div
        // style={{background: 'linear-gradient(179.7deg, #040444, rgb(3 3 63))'}}
        className="grid grid-cols-12 p-0 overflow-hidden justify-stretch bg-[#3a5ccc] text-gray-800 border border-gray-100 rounded rounded-3xl"
      >
        <div className="md:col-span-5 relative col-span-12 font-inter p-2  relative flex flex-col">
          {/* <div className="absolute w-[146%] bg-blue-800 h-[180%] -mt-[8%] -ml-[46%] left-0" style={{borderRadius:'100%'}}/> */}
          {/* <SponsorBubble/> */}
          <div 
          onClick={(e)=>{e.preventDefault();e.stopProgagation}}
          className="pointer-events-auto p-5 md:p-12 md:pr-0 rounded-3xl z-10" style={{width:'fit-content'}}>
          <div
            className="h-6 text-base text-blue-100 font-semibold leading-7"
            aria-hidden="true"
          >
            A better world. Designed by you.
          </div>
          <h1 className="max-w-[32rem] mt-2 text-white text-4xl font-bold tracking-tight md:text-3xl 2md:text-3xl lg:text-5xl lg:leading-tight md:leading-tight">
            Design and build the future, together.
          </h1>
          <p className="mt-3 text-gray-100 max-w-[32rem]">
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
        <div className="col-span-2 relative z-20">
          </div>
           <div className="col-span-5 hidden md:block relative h-full">
            <ParticlesContainer tools={tools} sponsor={sponsor} />
                    <div className="absolute w-[148%] bg-gradient-to-l z-10 from-[#101d46] opacity-20 to-[#f0f4ff] h-[180%] -mt-[8%] -mr-[46%] right-0" style={{borderRadius:'100%', zIndex:1}}/>
                      {/* <div className="bg-gradient-to-l z-10 from-[#0a2254] to-transparent w-full absolute h-full top-0 right-0"/> */}
          </div>
        {/* <div className="hidden 2md:block w-1/2 relative h-full overflow-visible">
          <div className="absolute left-0 top-0 -mt-[3.3rem] w-[110%] py-20 overflow-x-auto pl-20 -ml-16">
            <CardDeckRow tools={tools} sponsor={sponsor} />
          </div>
        </div> */}
      
      </div>
      <div className="hidden md:block absolute top-0 left-0 w-full h-full grid grid-cols-12 ">
        <div className="col-span-5"/>
      <div className="col-span-2 relative z-20">
        <img src="/static/images/robotitosuelto.png" className="absolute w-[165px] z-10 bottom-0 -mb-[12px] right-0 -mr-[20px]"
              style={{filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.45))', transform: 'scaleX(-1)'}}/>

          </div>
      </div>
    </Container>
  );
};
export default IntroBanner;

const indigo = {
  indigo1: '#fdfdfe',
  indigo2: '#f8faff',
  indigo3: '#f0f4ff',
  indigo4: '#e6edfe',
  indigo5: '#d9e2fc',
  indigo6: '#c6d4f9',
  indigo7: '#aec0f5',
  indigo8: '#8da4ef',
  indigo9: '#3e63dd',
  indigo10: '#3a5ccc',
  indigo11: '#3451b2',
  indigo12: '#101d46',
}