import { TAB_ITEMS, ProductListData, ProductListData2 } from "@/lib/constants";
import Link from 'next/link'
import { MotionSlider } from "@/components/toolbox/ToolboxCarouselAnimation";
import { MotionSliderToolCard } from "@/components/toolbox/ToolboxHeroWithEmailSignup";
import { ArrowRight, Compass, Envelope } from "phosphor-react";
import SignupHorizontal from "@/components/newsletter/SignupHorizontal";
import Button from "@/components/Primitives/Button";

const ToolsCarouselSection = () =>{
    return(
        <div className="z-50 relative pt-[40px] px-3">
          <div className="text-xs font-medium mb-2 text-center text-gray-500/90 uppercase">Prototypr Toolbox</div>
          <h2 className="text-3xl font-bold mb-[42px] text-center text-black/80">Tools to shape <span className="text-underline inline-block md:inline">every idea</span></h2>
            <div className="pb-3">
              <MotionSlider
                  duration={50}
                  slides={ProductListData.map((data, i) => {
                    return (
                      <MotionSliderToolCard
                        title={data.title}
                        slug={data.slug}
                        subtext={data.description}
                        image={data.image}
                      />
                    );
                  })}
                />
            </div>
            <div className="pt- ">
              <MotionSlider
                duration={35}
                slides={ProductListData2.map((data, i) => {
                  return (
                    <MotionSliderToolCard
                      slug={data.slug}
                      title={data.title}
                      subtext={data.description}
                      image={data.image}
                    />
                  );
                })}
              />
            </div>
            <div className="w-full flex mt-3 -mb-6 justify-center relative">
            
                {/* <img src="/static/images/squiggle.svg"  className="w-[100px] h-[46px] absolute top-0 -mt-8 -z-10 -ml-8"/> */}
                <img src="/static/images/squiggle-arrow.svg"  className="w-[100px] h-[70px] absolute top-0 -mt-[44px] -z-10 -ml-[0px]"/>
                {/* <div className="w-[400px] mt-2">
                    <SignupHorizontal className="sm:flex w-full mt-5 mb-6" />
                </div> */}
              {/* <Link href="/newsletter">
              <Button variant="ghostBlue" className="rounded-full mb-[48px] font-medium mt-8 text-blue-700/80">Get&nbsp;<span className="">'em</span>&nbsp;weekly 
              </Button>
              </Link> */}
              <Link href="/newsletter">
              <div variant="ghostBlue" className="rounded-full relative mb-[48px] font-base mt-6 text-blue-900">Get&nbsp;<span className="">'em</span>&nbsp;weekly 
              {/* <Envelope className="inline -mt-[3px] ml-1" size={22} /> */}
              <img className="absolute top-0 right-0 -mr-[64px] -mt-[6px] h-[24px]" src="/static/images/mail.svg" />
              </div>
              </Link>
          </div>
        </div>
    )
}
export default ToolsCarouselSection