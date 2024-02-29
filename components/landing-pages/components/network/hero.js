import CTAButton from "./../common/button";

const Hero = () => {
  return (
    <div className="overflow-hidden">
      <div className="w-full max-w-6xl mx-auto  pt-32 md:pt-60 flex flex-col grid gap-10 px-5 ">
        <div className="flex flex-col grid gap-5 lg:flex lg:flex-row lg:gap-1 md:flex md:flex-col">
          <div className="flex flex-col max-w-xl z-[2] translate-y-20 md:translate-y-0">
            <h1 className="text-[#0F1F40] max-w-md mb-5 md:max-w-lg font-semibold text-4xl md:text-6xl font-inter md:leading-tight ">
             Get your creator profile
            </h1>
            <p className="mb-5 text-[#335f8b] md:leading-[32px] leading-[28px] text-[16px] md:text-[18px] font-inter md:pr-6">
              Prototypr content is open to all, but only invited members can create profiles and posts. 
              You can get an invite from current members or submit an application form to join as a creator.
            </p>

            <CTAButton />
          </div>
          <div className=" px-3 scale-100 lg:scale-[120%] translate-y-[70px] md:-translate-y-0">
            <img
              className="w-full lg:translate-x-10 lg:-translate-y-20 lg:scale-100 scale-[120%] translate-x-20  translate-y-10"
              src="/static/images/earth-network.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
