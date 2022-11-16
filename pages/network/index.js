import NetworkEarthIllustration from "../../components/landing-pages/illustrations/network-earth";
import FooterEarth from "../../components/landing-pages/illustrations/footer-earth";

const SnippetsFromTheBlog = () => {
  return (
    <div>
      <h2 className="text-[40px] text-[#113883] font-semibold font-inter max-w-md leading-[50px]">
        More about <br /> Open Design →
      </h2>
      <div className="grid grid-cols-3 gap-5 py-2 ">
        <div className="bg-[#E6F2FF] w-full h-[250px] rounded-lg"></div>
        <div className="bg-[#E6F2FF] w-full h-[250px] rounded-lg"></div>
        <div className="bg-[#E6F2FF] w-full h-[250px] rounded-lg"></div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="w-full h-auto fixed top-0 pointer-events-none z-10">
      <div className="w-full max-w-6xl mx-auto h-[80px] mt-10 pointer-events-auto cursor-pointer">
        <div className="w-full h-full bg-white rounded-full mt"></div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <div className="w-full max-w-6xl mx-auto pt-60 flex flex-col gap-10 ">
      <div className="flex flex-row">
        <div className="flex flex-col gap-5 max-w-xl ">
          <h1 className="text-[#0F1F40] font-semibold text-[56px] font-inter leading-[66px] ">
            Welcome to the Prototypr Network
          </h1>
          <p className="text-[#46719B] leading-[32px] text-[18px] font-inter">
            Web Monetization is a way that content creators can earn from
            streaming micropayments based on the amount of time that visitors
            spend on their digital content.
          </p>
          <div>
            <button className="px-20 py-5 rounded-full bg-[#195DE2] text-white font-semibold font-inter">
              Request an Invite
            </button>
          </div>
        </div>
        <div className="translate-x-10 -translate-y-20">
          <NetworkEarthIllustration />
        </div>
      </div>
    </div>
  );
};

const Benefits = [
  {
    title: "Distribution",
    description: `There has been a rise in centralized publishing platforms
    optimizing for paywalled business models that create a barrier to
    free learning.`,
  },
  {
    title: "Find Writing Gigs",
    description: `There has been a rise in centralized publishing platforms
    optimizing for paywalled business models that create a barrier to
    free learning.`,
  },
  {
    title: "Get Paid to Write",
    description: `There has been a rise in centralized publishing platforms
    optimizing for paywalled business models that create a barrier to
    free learning.`,
  },
  {
    title: "Build your Audience",
    description: `There has been a rise in centralized publishing platforms
    optimizing for paywalled business models that create a barrier to
    free learning.`,
  },
];

const people = [...Array(30)];

const PitchSection = () => {
  return (
    <div className="w-full bg-[#CCE6FF] relative">
      <div className="bg-[#CCE6FF]  h-[300px]"></div>
      <div className="bg-[#CCE6FF]">
        <svg
          width="1482"
          height="345"
          viewBox="0 0 1482 345"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 344.799L1482 0V344.799H0Z" fill="#F8B700" />
        </svg>
      </div>
      <div className="bg-[#F8B700]  h-[100px]"></div>
      <div className="w-full h-full absolute top-0 ">
        <div className="w-full max-w-7xl mx-auto ">
          <div className="w-full bg-[#195DE2] h-auto rounded-3xl py-20">
            <div className="max-w-6xl mx-auto  flex flex-col gap-5">
              <h2 className="text-[50px] max-w-2xl leading-[60px] font-semibold font-inter text-white">
                A place to meet like minded writers, share ideas and spread
                knowledge
              </h2>
              <p className="text-[#C4D7FD] max-w-lg text-[18px] font-inter leading-[32px]">
                Web Monetization is a way that content creators can earn from
                streaming micropayments based on the amount of time that
                visitors spend on their digital content.
              </p>
              <div className="flex flex-row gap-5 flex-wrap">
                {people.map((peep, i) => {
                  return (
                    <div
                      key={i}
                      className="w-[80px] h-[80px] rounded-full border bg-white bg-opacity-10 border-white border-opacity-10"
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MissionSection = () => {
  return (
    <div className="w-full py-40 bg-[#F8B700]">
      <div className="w-full max-w-6xl mx-auto  ">
        <div className="max-w-3xl">
          <h3 className="text-[#723636] text-[60px] leading-[70px] font-semibold font-inter">
            Our mission is to make Design Open for all, just like Open Source
            Code.
          </h3>
          <h3 className="text-[#723636] text-[40px] leading-[70px] font-semibold font-inter my-5">
            Why Join Us?
          </h3>
        </div>
        <div className="flex flex-row flex-wrap gap-10 my-5">
          {Benefits.map((items, i) => {
            return (
              <div key={i} className="max-w-lg">
                <h3 className="font-semibold font-inter text-[32px] text-[#723636]">
                  {items.title}
                </h3>
                <p className="leading-[34px] font-inter font-medium text-[16px] text-[#914C4C]">
                  {items.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const FooterCTA = () => {
  return (
    <div className="w-full bg-[#CCE6FF] h-auto sky-gradient">
      <div className=" max-w-6xl mx-auto flex flex-col justify-center items-center  h-full">
        <div className="w-full flex flex-col  gap-4 items-center pt-40 pb-10">
          <h4 className="text-[60px] font-inter text-center font-semibold text-[#0F1F40] leading-[70px] max-w-lg">
            Be a a part of like minded writers
          </h4>
          <div>
            <button className="px-20 py-5 rounded-full bg-[#195DE2] text-white font-semibold font-inter">
              Request an Invite
            </button>
          </div>
        </div>
        <div className=" w-full flex flex-row justify-center relative h-[400px] overflow-hidden">
          <div className="absolute top-[300px] scale-[200%]">
            <FooterEarth />
          </div>
        </div>
      </div>
    </div>
  );
};

const NetworkPage = () => {
  return (
    <div className="bg-[#CCE6FF]">
      <Header />
      <Hero />
      <PitchSection />
      <MissionSection />
      <FooterCTA />
    </div>
  );
};

export default NetworkPage;
