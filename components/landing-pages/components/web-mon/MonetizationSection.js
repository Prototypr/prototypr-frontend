const Features = [
  {
    heading: "A paywall alternative",
    desp: `Readers shouldn’t have to stumble through paywalls and ads to read on the web. Web Monetization lets creators receive micropayments from web-monetized users visiting their work.`,
    src: "/static/images/web-mon-paywall.svg",
  },
  {
    heading: "Privacy-first",
    desp: `Web Monetization provides an alternative revenue stream that doesn't depend on invasive practices such as harvesting user data to sell targeted ads, like platforms such as Facebook.  `,
    src: "/static/images/web-mon-privacy.svg",
  },
];

const WebMonetizationSection = () => (
  // bg-[#22AA79]
  <div c className="w-full  bg-[transparent] pt-0 relative z-10 px-5 md:px-0">
    {/* <div className="w-full bg-[#fff] rounded-t-[40px]"> */}
    <div className="bg-[#FFFFFF] max-w-7xl mx-auto p-10  pt-30 md:pt-32 md:p-20 md:pb-32 rounded-t-[30px] flex flex-col grid gap-5 md:gap-10">
      <div className="flex grid flex-col gap-6">
        {/* <Curly /> */}
        <h2 className="text-[#000] leading-[44px] md:leading-[60px] text-[26px] sm:text-[32px] md:text-[40px] font-inter font-medium">
          {/* We are experimenting <br /> with{" "}
        <span className="italic">Web Monetization </span> */}
          {/* Better business <br /> models for the web */}
          Earn micropayments <br />
          with Web-Monetization
        </h2>
        <div className="flex flex-col max-w-lg md:flex-col grid gap-4 md:gap-4 text-[#707070]">
          <p className="leading-[34px] text-[18px] font-inter font-normal">
            Introducing an alternative business model, that keeps the Web open.
            Earn tips and micropayments based on the time readers spend on your work.
          </p>
          <p className="leading-[34px] text-[18px] font-inter font-normal">
            <span className="font-semibold text-gray-700">Web Monetization</span> is a new system making it possible to reward creators, without gating work behind a paywall. 
            Powered by payment providers like Coil, the goal is to facilite a 
            fairer, ad-free, open web. 
            {/* With Coil, creators can receive tips and for the first time on the web, live micropayments based on engagement. */}
          </p>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-10">
        {[
          Features.map((x) => {
            return (
              <div className="w-full flex grid flex-col gap-6">
                <div className="w-full h-auto bg-black bg-opacity-10 rounded-xl relative overflow-hidden">
                  <img className="w-full" src={x.src}></img>
                </div>
                <div className="flex flex-col grid gap-4">
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

export default WebMonetizationSection;
