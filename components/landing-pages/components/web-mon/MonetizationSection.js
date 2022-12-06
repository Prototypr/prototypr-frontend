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
    <div className="bg-[#FFFFFF] max-w-7xl mx-auto p-10  pt-30 md:pt-32 md:p-20 md:pb-32 rounded-t-[30px] flex flex-col gap-5 md:gap-10">
      <div className="flex flex-col gap-6">
        {/* <Curly /> */}
        <h2 className="text-[#000] leading-[44px] md:leading-[60px] text-[26px] sm:text-[32px] md:text-[40px] font-inter font-medium">
          {/* We are experimenting <br /> with{" "}
        <span className="italic">Web Monetization </span> */}
          Better business <br /> models for the web
        </h2>
        <div className="flex flex-col max-w-lg md:flex-col gap-4 md:gap-4 text-[#707070]">
          <p className="leading-[34px] text-[18px] font-inter font-normal">
            Creativity thrives in open and connected environments, yet the web is increasingly divided into
            walled gardens. Paywalls help creators paid, but they restrict innovation.
          </p>
          <p className="leading-[34px] text-[18px] font-inter font-normal">
            Web Monetization is a system that rewards creators for their work whilst facilitating a 
            fairer, ad-free, open web. 
            Powered by Interledger, a protocol for transferring money, native monetization is 
            possible for the first time on the web.
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

export default WebMonetizationSection;
