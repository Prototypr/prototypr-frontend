import PayoutTable from "@/components/WebMonetization/PayoutTable/PayoutTable";
import Header from "@/components/landing-pages/components/common/header";
const Footer = dynamic(() => import("@/components/footer"));
import dynamic from "next/dynamic";
import Meta from "@/components/meta";

const GlobeIcon = () => {
  return (
    <svg
      width="107"
      height="72"
      viewBox="0 0 107 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.80469 52.5287H31.2235C43.661 52.5287 55.3044 46.4172 62.369 36.1808L83.0571 6.2041"
        stroke="#F366FF"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M1.82617 61.6631H35.6735C47.6301 61.6631 58.8833 56.0125 66.0247 46.4229L96.5 5.5"
        stroke="#F57D39"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M1.5 70.7972H39.6778C51.3998 70.7972 62.4601 65.365 69.6259 56.0884L106 9"
        stroke="#309BFE"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M47.7563 5.80866L44.0377 11.0756L47.0867 16.7564L41.8198 13.0378L36.1389 16.0868L39.8575 10.8199L36.8085 5.13907L42.0754 8.8576L47.7563 5.80866Z"
        fill="white"
      />
      <path
        d="M16.8092 28.5327L16.4012 31.9943L19.3152 33.9069L15.8536 33.4988L13.9411 36.4129L14.3491 32.9512L11.4351 31.0387L14.8967 31.4468L16.8092 28.5327Z"
        fill="white"
      />
    </svg>
  );
};

const PayoutSection = () => {
  return (
    <div className="w-full bg-white p-10">
      <div className="w-full max-w-7xl mx-auto py-0 md:py-32 flex flex-col gap-7 md:gap-4">
        <h3 className="md:text-[40px] text-[30px] text-[#A4A4A4] leading-[40px] md:leading-[50px] font-inter font-semibold">
          Past Payouts <br /> to our Writers
        </h3>
        <div className="w-full flex flex-col gap-5">
          <PayoutTable />
        </div>
      </div>
    </div>
  );
};

const FooterCTA = () => {
  return (
    <div className="w-full bg-[#00028C] pt-10 md:pt-20 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-content items-center pt-10 z-[1]">
        <div className="flex flex-col gap-5 justify-center items-center">
          <h3 className="text-white text-[32px] sm:text-[40px] md:text-[60px] font-semibold leading-[42px] md:leading-[70px] font-inter">
            Let’s rewrite The <br /> story of the Web
          </h3>
          <div className="my-4">
            <a
              href="https://coil.com/?ref=prototypr.io"
              target={"_blank"}
              className="px-10 py-5 bg-[#0C0C3B] rounded-full text-sm text-white "
            >
              Learn more about Coil
            </a>
          </div>
        </div>

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
    </div>
  );
};

const articles = [
  {
    url: "https://prototypr.io/post/the-freemium-web-youve-read-all-your-free-articles-this-month",
    src: "/static/images/web-mon-web3.png",
  },
  {
    url: "https://prototypr.io/post/big-techs-broken-promises-which-path-will-you-choose",
    src: "/static/images/web-mon-bt.webp",
  },
  {
    url: "https://prototypr.io/post/the-rise-of-designer-communities-has-the-algorithm-lost-its-rhythm",
    src: "/static/images/web-mon-com.png",
  },
];

const WebStandard = () => {
  return (
    <div className="py-0 bg-[#fff]">
      <div className="bg-[#00028C] pt-20 md:pt-40 p-10 rounded-t-[40px] overflow-hidden">
        <div className="w-full h-auto max-w-7xl mx-auto flex flex-col gap-10 py-10">
          <div className="flex flex-col md:flex-row gap-10 md:gap-0">
            <div className="flex flex-col gap-2">
              <GlobeIcon />
              <div className="flex flex-col gap-10 md:py-10">
                <h3 className="text-[28px] sm:text-[32px] md:text-[40px] leading-[42px] md:leading-[60px] text-white font-inter font-medium">
                  A New Standard <br /> for the Web that <br />{" "}
                  <span className="italic text-[#309BFE]">
                    Rewards Creators
                  </span>
                </h3>
                <div className="max-w-3xl flex flex-col gap-5 font-inter leading-[34px] text-[18px] text-[#9FBDDF]">
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
                <a
                  href="https://open.prototypr.io/publications"
                  className="text-white font-inter"
                  target={"_blank"}
                >
                  Learn more →
                </a>
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
            {articles.map((x) => {
              return (
                <a href={x.url} target="_blank" className="hover:scale-105">
                  <div
                    style={{
                      backgroundImage: `url(${x.src})`,
                      backgroundSize: "cover",
                    }}
                    className="w-full overflow-hidden  bg-white bg-opacity-10 rounded-lg cursor-pointer h-[200px] md:h-[250px]"
                  ></div>
                </a>
              );
            })}
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
      <div className="w-full bg-[#fff] rounded-t-[40px]">
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
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <div className="w-full bg-[#22AA79] h-auto flex flex-row relative px-10">
      <div className="relative max-w-7xl mx-auto w-full h-full z-[2] flex flex-col md:flex-row py-10 md:py-0">
        <div className="w-full flex flex-col gap-4 pt-32 md:pt-52 py-20 md:py-32">
          <h1 className="text-[30px] sm:text-[40px] md:text-[60px] font-inter text-[#113E33] leading-[44px] md:leading-[64px] font-semibold">
            Better business <br /> models for the web
          </h1>
          <p className="text-[#116244] text-[18px] leading-[34px] max-w-lg font-medium font-inter">
            Web Monetization is a way that content creators can earn from
            streaming micropayments based on the amount of time that visitors
            spend on their digital content.
          </p>
          <div className="my-4">
            <a
              href="https://coil.com/?ref=prototypr.io"
              target={"_blank"}
              className="px-10 py-5 bg-black rounded-full text-sm text-white "
            >
              Learn more about Coil
            </a>
          </div>
        </div>
        <div className="flex flex-row justify-end items-center  w-full">
          <img
            className="relative w-[550px] right-0 pointer-events-none"
            src="/static/images/web-mon-shop.svg"
          />
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="bg-[#22AA79] overflow-hidden">
      <Meta />
      <Header />
      <Hero />
      <WebMonetizationSection />
      <WebStandard />
      <FooterCTA />
      <PayoutSection />
      <Footer />
    </div>
  );
};

export default Index;
