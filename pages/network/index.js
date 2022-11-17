import dynamic from "next/dynamic";
import Meta from "@/components/meta";
import Link from "next/link";

const Footer = dynamic(() => import("@/components/footer"));

const BlogPostCard = () => {
  return (
    <div className="bg-[#E6F2FF] cursor-pointer transition ease-in-out w-full h-[240px] rounded-lg border border-black border-opacity-5"></div>
  );
};

const SnippetsFromTheBlog = () => {
  return (
    <div className="w-full px-0 md:px-5 bg-transparent">
      <div className="p-5 md:p-10 bg-white  rounded-none md:rounded-3xl mb-20 max-w-7xl mx-auto shadow-sm">
        <h2 className="text-[24px] my-4 text-[#0F1F40] font-semibold font-inter max-w-md leading-[32px]">
          More about <br /> Open Design →
        </h2>
        <div className="flex flex-col lg:flex-nowrap lg:flex lg:flex-row md:flex md:flex-wrap md:flex-col gap-5 py-2 ">
          <BlogPostCard />
          <BlogPostCard />
          <BlogPostCard />
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="w-full h-auto fixed top-0 pointer-events-none z-[100] px-4">
      <div className="w-full max-w-6xl mx-auto h-auto mt-10 pointer-events-auto cursor-pointer">
        <div className="w-full h-full p-6 bg-white rounded-[12px] border border-black border-opacity-5 ">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link href="/" as="/" legacyBehavior>
              <div
                className={`${
                  true ? "opacity-1" : "md:opacity-0 md:mt-16 md:-z-1"
                } flex-shrink-0 flex items-center cursor-pointer transition transition-all duration-300 ease-in-out`}
              >
                <img
                  data-gumlet="false"
                  className="block lg:hidden h-10 w-auto"
                  src="/static/images/logo-small.svg"
                  alt="Prototypr Logo"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  data-gumlet="false"
                  src={`/static/images/logo.svg`}
                  alt="Prototypr Logo"
                />
              </div>
            </Link>
            <div
              className={`hidden md:block ${
                true ? "opacity-1" : "md:opacity-0"
              } my-auto transition transition-all duration-300 ease-in-out`}
            >
              {/* <WMCounter /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CTAButton = () => {
  return (
    <div>
      <button className="p-5 px-10 w-full max-w-[250px] text-[16px] rounded-full bg-[#195DE2] text-white font-medium font-inter border border-[#9DDBFD] border-opacity-40">
        Request an Invite
      </button>
    </div>
  );
};

const Hero = () => {
  return (
    <div className="overflow-hidden">
      <div className="w-full max-w-6xl mx-auto  pt-32 md:pt-60 flex flex-col gap-10 px-5 ">
        <div className="flex flex-col gap-5 lg:flex lg:flex-row lg:gap-1 md:flex md:flex-col">
          <div className="flex flex-col gap-5 max-w-xl z-[2] translate-y-20 md:translate-y-0">
            <h1 className="text-[#0F1F40] max-w-md md:max-w-lg font-semibold text-5xl md:text-[56px] font-inter leading-[50px] md:leading-[60px] ">
              Welcome to the Prototypr Network
            </h1>
            <p className="text-[#46719B] md:leading-[32px] leading-[28px] text-[16px] md:text-[18px] font-inter">
              Web Monetization is a way that content creators can earn from
              streaming micropayments based on the amount of time that visitors
              spend on their digital content.
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

const people = [...Array(7)];

const PitchSection = () => {
  return (
    <div className="w-full bg-[#CCE6FF] h-auto relative ">
      {/*    */}

      <div className=" w-full h-auto relative z-10">
        <div className="w-full h-auto   p-2 md:p-10 z-10">
          <div className="w-full max-w-7xl mx-auto px-0 md:px-5 z-10">
            <div className="w-full bg-[#195DE2] h-auto rounded-[32px] px-5 py-10 md:py-20 md:px-10">
              <div className="max-w-6xl mx-auto  flex flex-col gap-5">
                <h2 className="md:text-[50px] text-[30px] max-w-2xl leading-[40px] md:leading-[60px] font-semibold font-inter text-white">
                  A place to meet like minded writers, share ideas and spread
                  knowledge
                </h2>
                <p className="text-[#C4D7FD] max-w-lg text-[18px] font-inter leading-[32px]">
                  Web Monetization is a way that content creators can earn from
                  streaming micropayments based on the amount of time that
                  visitors spend on their digital content.
                </p>
                <div className="flex flex-row gap-4 md:gap-5 flex-wrap">
                  {people.map((peep, i) => {
                    return (
                      <div
                        key={i}
                        className="md:w-[120px] md:h-[120px] lg:w-[200px] lg:h-[200px] w-[60px] h-[60px] rounded-full border bg-white bg-opacity-10 border-white border-opacity-10"
                      ></div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0">
        <img
          className="w-full translate-y-[4px] z-0"
          src="/static/images/tilt-section.svg"
        />
        <div className="w-full h-[100px] md:h-[300px] translate-y-[2px] bg-[#F8B700]"></div>
      </div>
    </div>
  );
};

const MissionSection = () => {
  return (
    <div className="w-full pb-40 bg-[#F8B700] px-5 ">
      <div className="w-full max-w-6xl mx-auto  ">
        <div className="max-w-3xl pt-20 md:pt-32">
          <h3 className="text-[#723636] text-[40px] leading-[50px] md:text-[60px] md:leading-[70px] font-semibold font-inter">
            Our mission is to make Design Open for all, just like Open Source
            Code.
          </h3>
          <h3 className="text-[#723636] text-[24px] leading-[70px] font-semibold font-inter my-3 md:my-5">
            Why Join Us?
          </h3>
        </div>
        <div className="flex flex-row flex-wrap gap-7 md:gap-10 my-5">
          {Benefits.map((items, i) => {
            return (
              <div key={i} className="max-w-lg flex flex-col gap-3">
                <h3 className="font-semibold font-inter text-[18px] text-[#723636]">
                  {items.title}
                </h3>
                <p className="leading-[34px] font-inter font-medium text-[18px] text-[#723636]">
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
    <div className="w-full bg-[#CCE6FF] relative h-auto sky-gradient ">
      <div className="w-full bg-[#F8B700] p-10 rounded-b-[30px] -translate-y-1"></div>
      <div className="px-5">
        <div className="absolute p-10 pointer-events-none z-[0]">
          <img className="w-full" src="/static/images/stars.svg" />
        </div>
        <div className=" max-w-6xl mx-auto flex flex-col justify-center items-center  h-full">
          <div className="w-full flex flex-col  gap-4 items-center pt-32 pb-10 z-[1]">
            <h4 className="md:text-[60px] text-[40px] font-inter text-center font-semibold text-[#0F1F40] leading-[40px] md:leading-[70px] max-w-lg">
              Be a a part of like minded writers
            </h4>
            <CTAButton />
          </div>
          <div className=" w-full flex flex-row justify-center  overflow-hidden">
            <img className=" " src="/static/images/earth.png" />
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
      <Meta seo={{}} />

      <Hero />
      <SnippetsFromTheBlog />
      <PitchSection />
      <MissionSection />
      <FooterCTA />
      <Footer />
    </div>
  );
};

export default NetworkPage;
