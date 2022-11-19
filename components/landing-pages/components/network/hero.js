import CTAButton from "./../common/button";

const Hero = () => {
  return (
    <div className="overflow-hidden">
      <div className="w-full max-w-6xl mx-auto  pt-32 md:pt-60 flex flex-col gap-10 px-5 ">
        <div className="flex flex-col gap-5 lg:flex lg:flex-row lg:gap-1 md:flex md:flex-col">
          <div className="flex flex-col gap-5 max-w-xl z-[2] translate-y-20 md:translate-y-0">
            <h1 className="text-[#0F1F40] max-w-md md:max-w-lg font-semibold text-5xl md:text-[56px] font-inter leading-[50px] md:leading-[60px] ">
            {/* Write Together. Build Together. */}
            {/* Custodians of the Open Web */}
            {/* The First Word */}
            {/* For people who write about design */}
            A Writing Hub for Designers
            </h1>
            <p className="text-[#46719B] md:leading-[32px] leading-[28px] text-[16px] md:text-[18px] font-inter md:pr-6">
            A network for writers to share and receive feedback. On a platform where quality is rewarded, not clicks.
            Prototypr is an Open Source design platform, driven by humans, not algorithms or 'likes' - join today and contribute to an open and fairer web.
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
