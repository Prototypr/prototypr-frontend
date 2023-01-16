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
    <Container padding={false} maxWidth="relative grid">
      <div className="pt-[96px] justify-stretch bg-[#CCE6FF]/90 text-gray-800"
      >
        <img src="/static/images/bendy9.svg" className="absolute bottom-0 -mb-[12%] xs:-mb-[15%] md:-mb-[15%] z-40 left-0 w-full"/>
        <div className="max-w-[1320px] mx-auto relative grid grid-cols-12">
        <div className="hidden 2xl:block absolute z-10 opacity-100 w-[620px] h-[500px] -mr-[20%] bg-gradient-to-r to-[#d1e8ff] from-transparent via-[#d1e8ff]/10 z-10 h-full top-0 right-0 -mt-[2%] -mr-[20%] object-cover"></div>
          <img className="hidden md:block absolute opacity-100 w-[620px] h-[500px] z-10 h-full top-0 right-0 -mt-[20px] -mr-[225px] sm:-mr-[40%] 2md:-mr-[20%] xl:-mr-[200px] 2xl:-mr-[20%] object-cover" 
          src="/static/images/gradient15c.png"  style={{ zIndex:1, borderTopLeftRadius:'30%'}}/>
        <div className="md:col-span-6 pb-10 pt-8 px-7 relative col-span-12 font-inter p-2  relative flex flex-col">
          <div 
          onClick={(e)=>{e.preventDefault();e.stopProgagation}}
          className="pointer-events-auto md:pr-0 md:pb-12 md:pt-6 rounded-3xl z-10" style={{width:'fit-content'}}>
          <h1 className="max-w-[50rem] mt-2 mb-5 text-[#0F1F40] text-5xl font-semibold tracking-tight xl:text-[56px] lg:leading-tight md:leading-tight">
          Learn. Create. Publish.
          </h1>
          <p className="mb-5 text-[#436586] md:leading-[32px] leading-[28px] text-[16px] md:text-[18px] font-inter md:pr-6 max-w-[32rem]">
            Discover the people, ideas, and process behind designing and building great products.
          </p>
          <div className="flex mt-4 mb-6 sm:mb-0">
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
        </div>
      </div>
      
      </div>
      <div className="absolute top-0 left-0 w-full h-full grid grid-cols-12 " style={{pointerEvents:'none'}}>
      
        <div className="col-span-6"/>
      <div className="col-span-2 relative z-50">
        <div className="hidden 2md:block boto absolute bottom-0  right-0 -mr-[240px] md:-mr-[20px]">
          <div className="relative">
              <img src="/static/images/robotitosuelto.png" className="w-[165px] collab-cursor z-10"
                    style={{filter: 'drop-shadow(0 15px 10px rgb(0 0 0 / 0.3))', transform: 'scaleX(-1)', pointerEvents:'all'}}/>

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
          <div className="hidden md:block col-span-4 mt-[88px] relative z-5" style={{pointerEvents:'all'}}>
                            <ParticlesContainer tools={tools} sponsor={sponsor} />                         
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