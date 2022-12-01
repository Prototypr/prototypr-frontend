const Features = [
  {
    heading: "Goodbye Paywalls",
    desp: ` There has been a rise in centralized publishing platforms
    optimizing for paywalled business models that create a barrier to
    free learning.`,
    src: "/static/images/web-mon-paywall.svg",
  },
  {
    heading: "Say no to Targeted Ads",
    desp: ` Platforms like Facebook and Instagram are optimised to harvest
    and exploit user data to sell targeted ads, and content surfaced
    is geared specifically to sell a corporate product.`,
    src: "/static/images/web-mon-privacy.svg",
  },
];

const WebMonetizationSection = () => {
  return (
    // bg-[#22AA79]
    <div c className="w-full  bg-[transparent] pt-0 relative z-10 px-5 md:px-0">
      {/* <div className="w-full bg-[#fff] rounded-t-[40px]"> */}
      <div className="bg-[#FFFFFF] max-w-7xl mx-auto p-10  pt-30 md:pt-32 md:p-20 md:pb-32 rounded-t-[30px] flex flex-col gap-5 md:gap-10">
        <div className="flex flex-col gap-6">
          {/* <Curly /> */}
          <h2 className="text-[#000] leading-[44px] md:leading-[60px] text-[26px] sm:text-[32px] md:text-[40px] font-inter font-medium">
            We are experimenting <br /> with{" "}
            <span className="italic">Web Monetization </span>
          </h2>
          <div className="flex flex-col max-w-lg md:flex-col gap-4 md:gap-4 text-[#707070]">
            <p className="leading-[34px] text-[18px] font-inter font-normal">
              Traditionally, blogs and educational content in the design
              industry have been openly accessible for anyone on the web to
              learn from, no matter their background. With the cost of design
              education inaccessible to many.
            </p>
            <p className="leading-[34px] text-[18px] font-inter font-normal">
              The open web enabled a thriving self-taught generation of
              designers and developers. Over the last few years though, we've
              seen a growth of paywalls that restrict access to content, and
              increasingly intrusive ads.
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-10">
          {[
            Features.map((x) => {
              return (
                <div className="w-full flex flex-col gap-6">
                  <div className="w-full h-auto bg-black bg-opacity-10 rounded-xl relative overflow-hidden">
                    <img className="w-full" src={x.src}></img>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[28px] m-0 font-inter text-[#000] font-semibold">
                      {x.heading}
                    </h3>
                    <p className="leading-[34px] text-[18px] font-inter text-[#707070]">
                      {x.desp}
                    </p>
                  </div>
                </div>
              );
            }),
          ]}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default WebMonetizationSection;
