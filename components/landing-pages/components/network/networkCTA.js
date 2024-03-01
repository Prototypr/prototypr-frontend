import CTAButton from "./../common/button";

const NetworkCTA = () => {
  return (
    <div className="w-full bg-[#CCE6FF] relative h-auto sky-gradient ">
      <div className="w-full bg-[#fff] p-3 rounded-b-[40px] -translate-y-1"></div>
      <div className="px-5">
        <div className="absolute p-10 pointer-events-none z-[0]">
          <img className="w-full" src="/static/images/stars.svg" />
        </div>
        <div className=" max-w-6xl mx-auto flex flex-col justify-center items-center  h-full">
          <div className="w-full flex flex-col space-y-4 items-center pt-32 pb-10 z-[1]">
            <h4 className="md:text-[60px] text-[40px] font-inter text-center font-semibold text-[#0F1F40] leading-[40px] md:leading-[70px] max-w-lg">
            Become a contributor
            </h4>
            <CTAButton />
          </div>
          <div className="">
            <img className=" " src="/static/images/earth.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkCTA;
