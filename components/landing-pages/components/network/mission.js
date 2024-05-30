const Benefits = [
  {
    title: "Quality over quantity",
    description: `Attention hungry platforms force engagement to please algorithms, resulting in clickbait and shallow articles.
     We're not in a 'content' rat-race – join a network where quality rises over hype, regardless of 'likes' and follower counts.`,
  },
  {
    title: "Privacy-first",
    description: `Free, unbiased, and quality design material is increasingly hard to come by with the rise in paywalls and privacy-invasive ads. We're exploring new business models for the web that keep content open, whilst rewarding writers.`,
  },
  {
    title: "Built to reward contributors",
    description: `We're working to bring more ways for creators to earn through posting on Prototypr. We've experimented with <a target="_blank" class="underline text-black/80" href="/web-monetization">Web Monetization</a>, but are currently focusing on enabling creators to promote their own goods and services (e.g. courses and apps) with us.`,
  },
  {
    title: "Open source and Inclusive",
    description: `With the rise in corporate platforms optimizing for paywalled business models, our open source platform keeps educational content available to all readers, no matter their background.
    Articles are also translated to reach wider groups and cultures.`,
  },
];

const MissionSection = () => {
  return (
    <div className="w-full pb-40 bg-[#F8B700] px-5 ">
      <div className="w-full max-w-6xl mx-auto  ">
        <div className="max-w-3xl pt-20 md:pt-32">
          <h3 className="text-black/70 text-[40px] leading-[50px] md:text-[56px] md:leading-[70px] font-semibold ">
            {/* Our mission is to make Design Open for all, just like Open Source
            Code. */}
            We're creating a more mindful, open, and fair publishing platform.
          </h3>
          <h3 className="text-black/60 text-[24px] leading-[70px] font-semibold  my-3 md:my-5">
            Built in the open for design, code, and tech
          </h3>
        </div>
        <div className="flex grid md:grid-cols-2 flex-row flex-wrap gap-7 md:gap-10 my-5">
          {Benefits.map((item, i) => {
            return (
              <div key={i} className="max-w-lg grid flex flex-col grid gap-3">
                <h3 className="font-bold  text-[18px] text-black/70">
                  {item.title}
                </h3>
                <p className="leading-[34px]  font-medium text-[18px] text-black/60">
                  <div dangerouslySetInnerHTML={{__html:item.description}}/>
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
