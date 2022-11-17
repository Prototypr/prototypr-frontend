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

export default MissionSection;
