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

const WebStandard = () => {
  return (
    <div className="py-0 bg-[#22AA79]">
      <div className="bg-[#00028C] pt-20 md:pt-40 p-10 rounded-t-[10px] md:rounded-t-[40px] overflow-hidden">
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

export default WebStandard;
