import Link from "next/link";
import Button from "@/components/Primitives/Button";
import Container from "@/components/container";
// import gumletLoader from "../../new-index/gumletLoader";
// import Image from "next/image";
// import { usePlausible } from "next-plausible";
// import CardDeckRow from "@/components/v4/layout/CardDeckRow";
import ParticlesContainer from "@/components/v4/particles/ParticlesContainer";
// import SponsorBubble from "@/components/v4/particles/SponsorBubble";

// https://codesandbox.io/s/eyes-follow-mouse-cursor-o577x?file=/src/index.js
import useMightyMouse from "react-hook-mighty-mouse";
import { useState } from "react";


const IntroBanner = ({ tools, sponsor }) => {

  const {selectedElement:{position:{angle:angleLeftEye}}} = useMightyMouse(true, "left-eye", { x: 45, y: 45 });
  const {selectedElement:{position:{angle:angleRightEye}}} = useMightyMouse(true, "right-eye", { x: 45, y: 45 });


  const styleLeftEye = {
    transform: `rotate(${-angleLeftEye}deg)`,
  };
  const styleRightEye = {
    transform: `rotate(${-angleRightEye}deg)`,
  };

  return (
    <Container padding={false} maxWidth="mb-4 relative grid">
      <div className="pt-[96px] justify-stretch bg-[#CCE6FF]/90 text-gray-800"
      style={{WebkitMask:'url(/static/images/bendy9.svg) center bottom / cover no-repeat;', 
      backgroundPosition: 'center center',
      backgroundSize: 'cover'}}
      >
      {/* <div className="pt-[96px] collab-cursor p-0 overflow-hidden justify-stretch bg-[#F7F7F8] text-gray-800 "> */}
        <div className="max-w-[1320px] mx-auto relative grid grid-cols-12">
         {/* <img style={{opacity:'0.6', pointerEvents:'none'}}className="absolute w-full h-full top-0 left-0 object-cover" 
          src="/static/images/checks.svg"/> */}
          <div className="hidden 2xl:block absolute z-10 opacity-100 w-[53%] h-[120%] bg-gradient-to-r to-[#CCE6FF] from-transparent via-transparent z-10 h-full top-0 right-0 -mt-[2%] -mr-[20%] object-cover"></div>
          <img className="absolute opacity-100 w-[53%] h-[120%] z-10 h-full top-0 right-0 -mt-[2%] -mr-[20%] object-cover" 
          src="/static/images/gradient15.svg"  style={{ zIndex:1, borderTopLeftRadius:'30%'}}/>
        <div className="md:col-span-6 pb-10 pt-8 px-7 relative col-span-12 font-inter p-2  relative flex flex-col">
          
          {/* <div className="absolute w-[146%] bg-blue-800 h-[180%] -mt-[8%] -ml-[46%] left-0" style={{borderRadius:'100%'}}/> */}         
          <div 
          onClick={(e)=>{e.preventDefault();e.stopProgagation}}
          className="pointer-events-auto md:pr-0 md:pb-12 md:pt-6 rounded-3xl z-10" style={{width:'fit-content'}}>
          {/* <div
            className="h-6 text-base text-blue-100 font-semibold leading-7"
            aria-hidden="true"
          >
            A design discovery universe
          </div> */}
          {/* <h1 className="max-w-[50rem] mt-2 mb-5 text-[#0F1F40] text-4xl font-semibold tracking-tight md:text-[56px] lg:leading-tight md:leading-tight"> */}
          <h1 className="max-w-[50rem] mt-2 mb-5 text-[#0F1F40] text-4xl font-semibold tracking-tight md:text-[56px] lg:leading-tight md:leading-tight">
          Learn. Create. Publish.
          </h1>
          <p className="mb-5 text-[#436586] md:leading-[32px] leading-[28px] text-[16px] md:text-[18px] font-inter md:pr-6 max-w-[32rem]">
            Discover the people, ideas, and process behind designing and building great products.
          </p>
          <div className="flex mt-4">
            <Link href="/early-access">
              <Button className="rounded-full bg-blue-600 text-white" variant="confirmBig">
                Sign up
              </Button>
            </Link>
          </div>
          </div>
        </div>
        <div className="col-span-1 relative z-20">
          </div>
           <div className="col-span-5 hidden relative md:block h-full">
           
                {/* <div className="absolute w-[148%] bg-gradient-to-r z-10 to-pink-200/30 from-blue-400/30 h-[180%] -mr-[46%] right-0" style={{borderRadius:'32%', zIndex:1}}/> */}
              
                {/* <img className="absolute opacity-90  w-[800px]  h-[180%]  z-10 h-full top-0 left-0 object-cover" 
          src="/static/images/Gradient.svg"  style={{borderRadius:'32%', zIndex:1}}/> */}
                      {/* <div className="bg-gradient-to-l z-10 from-[#0a2254] to-transparent w-full absolute h-full top-0 right-0"/> */}
          </div>
        {/* <div className="hidden 2md:block w-1/2 relative h-full overflow-visible">
          <div className="absolute left-0 top-0 -mt-[3.3rem] w-[110%] py-20 overflow-x-auto pl-20 -ml-16">
            <CardDeckRow tools={tools} sponsor={sponsor} />
          </div>
        </div> */}
      
      </div>
      
      </div>
      <div className="absolute top-0 left-0 w-full h-full grid grid-cols-12 " style={{pointerEvents:'none'}}>
      
        <div className="col-span-6"/>
      <div className="col-span-2 relative z-20">
        <div className="hidden sm:block boto absolute bottom-0  right-0 -mr-[240px] md:-mr-[20px]">
          <div className="relative">
              <img src="/static/images/robotitosuelto.png" className="w-[165px] collab-cursor z-10"
                    style={{filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.45))', transform: 'scaleX(-1)', pointerEvents:'all'}}/>

          <div className="eyes-follow-tired absolute z-20 top-0 mt-[48px] md:mt-[42px] 2md:mt-[48px] right-[66px] md:right-[60px] 2md:right-[66px]">
            <div className="container">
              <div className="eyes">
                <div id="left-eye" className="eye" style={styleLeftEye}>
                  <div className="pupil" />
                </div>
                <div id="right-eye" className="eye" style={styleRightEye}>
                  <div className="pupil" />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

          </div>
          <div className="col-span-4 mt-[88px] relative z-5" style={{pointerEvents:'all'}}>
                            {/* <div className="absolute w-[148%] bg-gradient-to-r z-10 from-[#c0cadd]/30 to-[#c0cadd]/10 h-[180%] mt-[3%] -mr-[46%] right-0" style={{borderRadius:'12%', zIndex:1}}/> */}
                            <ParticlesContainer tools={tools} sponsor={sponsor} />
                         
          {/* <div className="absolute w-[148%] collab-cursor bg-white border-gray-200 z-10 h-[84%] mb-1 bottom-0 -mr-[46%] right-0" style={{borderRadius:'3rem',zIndex:1}}/> */}
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