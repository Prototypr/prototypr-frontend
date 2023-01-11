import { MotionSlider } from "@/components/toolbox/ToolboxCarouselAnimation";

const MotionSliderToolCard = ({ title, subtext, image }) => {
  return (
    <div className="w-[450px] h-auto cursor-pointer relative rounded-2xl border border-opacity-20 bg-white grid grid-items-center p-4">
      <div className="flex flex-row gap-3">
        <div className="w-18 h-18 bg-gray-100 rounded-md"></div>
        <div className="w-full max-w-[200px] flex flex-col gap-0">
          <p className="text-base font-semibold">Linear</p>
          <p className="text-base font-normal text-[#989898] line-clamp-1">
            Product Management and Tracking
          </p>
        </div>
      </div>
    </div>
  );
};

const ToolBoxHero = () => {
  return (
    <div className="w-full h-full bg-white toolboxheroGradient pt-32 pb-20">
      <div className="w-full h-auto py-20 relative z-2">
        <div className="max-w-7xl mx-auto grid place-items-center h-full">
          <div className="flex flex-col justify-center items-center gap-2">
            <div>
              <img
                className=" w-20 h-20 shadow-xl border-black border-opacity-10"
                src={"/static/images/toolbox/toolbox-icon.svg"}
                alt="Prototypr Logo"
              />
            </div>
            <h1 className="text-[52px] leading-[63px] font-bold">
              Discover Tools, <br /> make life easier.
            </h1>
            <div>
              <input
                style={{
                  boxShadow:
                    "0px 100px 80px rgba(0, 0, 0, 0.00696822), 0px 30.1471px 24.1177px rgba(0, 0, 0, 0.01), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.0130318), 0px 4.5288px 3.62304px rgba(0, 0, 0, 0.02)",
                }}
                type="text"
                className="max-w-[400px] rounded-[12px] h-[72px] px-4 w-[400px] border-2 border-[#E6E6E6] bg-white"
                placeholder="Search over 15,000+ Tools..."
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-full relative py-5 flex flex-col gap-2  overflow-hidden">
        <div className=" flex flex-col items-center max-w-7xl mx-auto gap-5 top-0 w-full ">
          <MotionSlider
            duration={10}
            slides={[1, 2, 3, 4, 5].map((x) => {
              return <MotionSliderToolCard />;
            })}
          />
          <MotionSlider
            duration={20}
            slides={[1, 2, 3, 4, 5].map((x) => {
              return <MotionSliderToolCard />;
            })}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ToolBoxHero;
