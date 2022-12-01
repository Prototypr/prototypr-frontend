const PayoutSection = () => {
  return (
    <div className="w-full bg-white p-10">
      <div className="w-full max-w-7xl mx-auto py-0 md:py-32 flex flex-col gap-7 md:gap-4">
        <h3 className="md:text-[40px] text-[30px] text-[#A4A4A4] leading-[40px] md:leading-[50px] font-inter font-semibold">
          Past Payouts <br /> to our Writers
        </h3>
        <div className="w-full flex flex-col gap-5">
          {[...Array(5)].map((x) => {
            return (
              <div className="w-full border rounded-md bg-black bg-opacity-5 p-10"></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const FooterCTA = () => {
  return (
    <div className="w-full bg-[#0255F9] pt-10 md:pt-20 relative">
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-content items-center pt-10 z-[1]">
        <h3 className="text-white text-[32px] sm:text-[40px] md:text-[60px] font-semibold leading-[42px] md:leading-[70px] font-inter">
          Let’s rewrite The <br /> story of the Web
        </h3>
        <div className="w-full flex justify-center items-center relative">
          <img
            className="relative translate-y-18 sm:translate-y-24 md:translate-y-32"
            src="/static/images/draw-hands.svg"
          />
          <img
            className="w-full absolute  bg-opacity-10"
            src="/static/images/web-mon-avatars.svg"
          />
        </div>
      </div>
      <div className="w-full py-10 h-[100px] translate-y-1 bg-white z-[10] relative"></div>
    </div>
  );
};

const WebStandard = () => {
  return (
    <div className="py-0 bg-[#22AA79]">
      <div className="bg-[#0255F9] pt-20 md:pt-40 p-10 rounded-t-3xl overflow-hidden">
        <div className="w-full h-auto max-w-7xl mx-auto flex flex-col gap-10 py-10">
          <div className="flex flex-col md:flex-row gap-10 md:gap-0">
            <div className="flex flex-col gap-10 md:py-10">
              <h3 className="text-[28px] sm:text-[32px] md:text-[40px] leading-[42px] md:leading-[54px] text-white font-inter">
                A New Standard <br /> for the Web that <br /> Rewards Creators
              </h3>
              <div className="max-w-lg flex flex-col gap-5 font-inter leading-[32px] text-[18px] text-white">
                <p>
                  In a community that has knowledge sharing at its core, Web
                  Monetization provides a new model for rewarding creators,
                  whilst keeping the web open.
                </p>
                <p>
                  By integrating Web Monetization into the Prototypr platform.
                  We can create a privacy-friendly and unbiased place for
                  creators to earn from their content, whilst keeping it
                  accessible to anyone with internet access.
                </p>
              </div>
            </div>
            <div className=" px-3 w-full scale-100 lg:scale-[120%]  md:-translate-y-0">
              <img
                className="w-full md:translate-x-52 scale-100 md:scale-75  md:-translate-y-10 pointer-events-none"
                src="/static/images/web-mon-ppl.svg"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-1 grid-rows-3 md:grid-rows-1 md:grid-cols-3 flex-wrap gap-5">
            <div className="w-full  bg-white bg-opacity-10 rounded-lg cursor-pointer h-[200px] md:h-[250px]"></div>
            <div className="w-full  bg-white bg-opacity-10 rounded-lg cursor-pointer h-[200px] md:h-[250px]"></div>
            <div className="w-full  bg-white bg-opacity-10 rounded-lg cursor-pointer h-[200px] md:h-[250px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Features = [
  {
    heading: "Goodbye Paywalls",
    desp: ` There has been a rise in centralized publishing platforms
    optimizing for paywalled business models that create a barrier to
    free learning.`,
  },
  {
    heading: "Say no to Targeted Ads",
    desp: ` Platforms like Facebook and Instagram are optimised to harvest
    and exploit user data to sell targeted ads, and content surfaced
    is geared specifically to sell a corporate product.`,
  },
];

const WebMonetizationSection = () => {
  return (
    // bg-[#22AA79]
    <div c className="w-full  bg-transparent pt-0 relative z-10 px-5 md:px-0">
      <div className="bg-[#F6F6C9] max-w-7xl mx-auto p-10  pt-20 md:p-20 rounded-t-[30px] flex flex-col gap-5 md:gap-10">
        <h2 className="text-[#A99B6B] leading-[44px] md:leading-[54px] text-[26px] sm:text-[32px] md:text-[40px] font-inter font-semibold">
          We are experimenting <br /> with{" "}
          <span className="text-[#000000]">Web monetization </span>
        </h2>
        <div className="flex flex-col md:flex-row gap-4 md:gap-2 text-[#A19056]">
          <p className="leading-[36px] text-[18px] font-inter font-medium">
            Traditionally, blogs and educational content in the design industry
            have been openly accessible for anyone on the web to learn from, no
            matter their background. With the cost of design education
            inaccessible to many.
          </p>
          <p className="leading-[36px] text-[18px] font-inter font-medium">
            The open web enabled a thriving self-taught generation of designers
            and developers. Over the last few years though, we've seen a growth
            of paywalls that restrict access to content, and increasingly
            intrusive ads.
          </p>
        </div>
        <div className="w-full grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-10">
          {[
            Features.map((x) => {
              return (
                <div className="w-full flex flex-col gap-6">
                  <div className="w-full h-[300px] bg-black bg-opacity-10 rounded-xl"></div>
                  <div>
                    <h3 className="text-[24px] m-0 font-inter text-[#7E734E] font-semibold">
                      {x.heading}
                    </h3>
                    <p className="leading-[38px] text-[#A19056]">{x.desp}</p>
                  </div>
                </div>
              );
            }),
          ]}
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <div className="w-full bg-[#22AA79] h-auto flex flex-row relative px-10">
      <div className="relative max-w-7xl mx-auto w-full h-full z-[2]">
        <div className="flex flex-col gap-4 pt-32 md:pt-52 py-20 md:py-32">
          <h1 className="text-[30px] sm:text-[40px] md:text-[60px] font-inter text-[#113E33] leading-[44px] md:leading-[64px] font-semibold">
            Better business <br /> models for the web
          </h1>
          <p className="text-[#186B4E] text-[18px] leading-[34px] md:leading-[40px] max-w-lg font-medium">
            Web Monetization is a way that content creators can earn from
            streaming micropayments based on the amount of time that visitors
            spend on their digital content.
          </p>
          <div>
            <button className="px-10 py-5 bg-black rounded-full text-sm text-white">
              Learn more about Coil
            </button>
          </div>
        </div>
      </div>
      <div className="absolute z-0 w-full ">
        <img
          className="relative translate-x-[150px] translate-y-[330px] md:translate-x-9/20 md:-translate-y-[0px] lg:translate-x-9/20 lg:-translate-y-[600px] w-full right-0 pointer-events-none"
          src="/static/images/web-mon-coin.svg"
        />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="bg-[#22AA79] overflow-hidden">
      <Hero />
      <WebMonetizationSection />
      <WebStandard />
      <FooterCTA />
      <PayoutSection />
    </div>
  );
};

export default Index;
