// import { TAB_ITEMS, ProductListData, ProductListData2 } from "@/lib/constants";
import Link from 'next/link'
import { MotionSlider } from "@/components/toolbox/ToolboxCarouselAnimation";
import { MotionSliderToolCard } from "@/components/toolbox/ToolboxHeroWithEmailSignup";
// import {formatToolContent} from "@/lib/utils/formatToolContent";
// import { ArrowRight, Compass, Envelope } from "phosphor-react";
// import SignupHorizontal from "@/components/newsletter/SignupHorizontal";
// import Button from "@/components/Primitives/Button";

const ToolsCarouselSection = ({toolsList, sponsors}) =>{

    return(
        <div className="z-50 relative pt-[40px] px-3">
          {/* <div className="max-w-[1320px] mx-auto mt-5 px-3 md:px-3">
          <div className="text-xs font-medium text-left text-gray-800/90 uppercase mb-6">Latest in Prototypr Toolbox</div>
          <div className="text-3xl text-black/90 font-semibold text-center mx-auto -mt-8 mb-8 w-fit rounded-full">Hot this week</div>
          </div> */}
          <div className="text-xs font-medium mb-2 text-center text-gray-500/90 uppercase">Prototypr Toolbox</div>
          <h2 className="text-3xl font-bold tracking-tight mb-[42px] text-center text-black/90">Tools to shape <span className="text-underline inline-block md:inline">every idea</span></h2>

            <div className="pb-">
              <MotionSlider
                  initialDuration={250}
                  slides={[...toolsList.slice(0, 3), (sponsors?.length && sponsors[0]?.title) ? sponsors[0] : toolsList[3], ...toolsList.slice(4, 5), toolsList[6]].map((data, i) => {
                    return (
                        <MotionSliderToolCard
                          sponsored={data.postType == 'ad'}
                          title={data.title}
                          link={data.link}
                          slug={data.slug}
                          subtext={data.description}
                          image={data.logo}
                        />
                      );
                  })}
                />
            </div>
            <div className="pt- ">
              <MotionSlider
                initialDuration={220}
                slides={toolsList.slice(6,13).map((data, i) => {
                    return (
                      <MotionSliderToolCard
                        title={data.title}
                        slug={data.slug}
                        subtext={data.description}
                        image={data.logo}
                      />
                    );
                })}
              />
            </div>
          {/* <div className="w-[400px] mt-2">
              <SignupHorizontal className="sm:flex w-full mt-5 mb-6" />
          </div> */}
            {/* <div className="w-full  flex mt-3 -mb-6 justify-center relative">
            <div className="flex justify-center flex-col">

              <div className="mt-1">
                  <img src="/static/images/squiggle-arrow.svg"  className="w-[100px] h-[70px] left-1/2 -ml-[50px] absolute top-0  -mt-[36px] -z-10 -ml-[0px]"/>
                <Link href="/newsletter">
                <div className="rounded-full flex cursor-collab-blue hover:text-pink-600 text-[#3EA7F3] relative mb-[48px] font-base mt-[32px] text-blue-900">
                <img className="h-[24px] hover:drop-shadow-xl " src="/static/images/writing.svg" />
                <img className="-mt-[14px] h-[22px]" src="/static/images/mail.svg" />
                </div>
                </Link>
              </div>
          <div className="mx-auto -mt-[68px]">
            <Link href="/newsletter">
            <Button variant="ghostSmallBlue" className="rounded-full mb-[48px] font-medium mt-8 text-blue-400 outline-blue-400">
              Subscribe
            </Button>
            </Link>
          </div>
            </div>
          </div> */}
        </div>
    )
  }
  export default ToolsCarouselSection