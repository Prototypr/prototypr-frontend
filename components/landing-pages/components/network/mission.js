const Benefits = [
  {
    title: "Quality over quantity",
    description: `Corporate-run platforms force engagement to please algorithms, resulting in clickbait titles and shallow articles.
     Our human curators and editors ensure thoughts worth sharing are heard, regardless of 'likes' or follower counts.`,
  },
  {
    title: "Privacy-first",
    description: `Free, unbiased, and quality design material is increasingly hard to come by with the rise in paywalls and privacy-invasive ads. We're exploring new business models for the web that keep content open, whilst rewarding writers.`,
  },
  {
    title: "Built to reward writers",
    description: `Prototypr is built by writers, for writers. We write for passion, but we also know first-hand what it's like to make a living through writing in design. With that, we're working to bring more paid gigs to the writers network.`,
  },
  {
    title: "Open source and Inclusive",
    description: `With the rise in corporate platforms
    optimizing for paywalled business models, our open source platform keeps educational content available to all readers.
    We also translate articles to include wider groups and cultures.`,
  },
];

const MissionSection = () => {
  return (
    <div className="w-full pb-40 bg-[#F8B700] px-5 ">
      <div className="w-full max-w-6xl mx-auto  ">
        <div className="max-w-3xl pt-20 md:pt-32">
          <h3 className="text-[#723636] text-[40px] leading-[50px] md:text-[56px] md:leading-[70px] font-semibold font-inter">
            {/* Our mission is to make Design Open for all, just like Open Source
            Code. */}
            We're creating a more mindful, open, and fair publishing platform.
          </h3>
          <h3 className="text-[#723636] text-[24px] leading-[70px] font-semibold font-inter my-3 md:my-5">
            Built in the open for design, code, and tech
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

export default MissionSection;
