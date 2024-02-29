const people = [
  { img: "/static/images/people/vik.webp" },
  { img: "/static/images/people/clo.webp" },
  { img: "/static/images/people/victor.webp" },
  { img: "/static/images/people/naima.webp" },
  { img: "/static/images/people/dj.webp" },
  { img: "/static/images/people/graeme.webp" },
  { img: "/static/images/people/soph.webp" },
  { img: "/static/images/people/thalion.webp" },
];

const PitchSection = () => {
  return (
    <div className="w-full bg-[#CCE6FF] h-auto relative ">
      <div className=" w-full h-auto relative z-10">
        <div className="w-full h-auto   p-2 md:p-10 z-10">
          <div className="w-full max-w-7xl mx-auto px-0 md:px-5 z-10">
            <div className="w-full bg-[#195DE2] h-auto rounded-[32px] px-5 py-10 md:py-32 md:px-10">
              <div className="max-w-6xl mx-auto grid flex flex-col grid gap-5">
                <h2 className="md:text-[50px] text-[30px] max-w-2xl leading-[40px] md:leading-[60px] font-semibold font-inter text-white">
                  {/* A place to meet like minded writers, share ideas and spread
                  knowledge */}
                   Be the signal<br/> through the noise
                  {/* Mindful designers, building towards a calmer, fairer, and more open web.  */}
                  {/* Thoughts into words. Words into designs. Designs into the hands of users. */}
                </h2>
                <p className="text-white/80 max-w-lg text-[18px] font-inter leading-[32px]">
                 Prototypr is a place for genuine stories from real people. Having been unindated with spam profiles and AI-generated posts, we're now invite-only 
                 to maintain high quality content.
                </p>
                <div className="flex flex-row -ml-2 md:-ml-5 flex-wrap max-w-3xl mt-5">
                  {people.map((peep, i) => {
                    return (
                      <div className=" overflow-hidden ml-2 my-2 md:mx-4 md:my-4 lg:w-[120px] border-4 cursor-pointer  lg:h-[120px] w-[100px] h-[100px] rounded-full bg-white bg-opacity-10 border-white border-opacity-10">
                        {peep?.img && (
                          <img
                            key={i}
                            className="relative hover:scale-125 object-cover h-full rounded-full transition ease-in-out"
                            src={peep?.img}
                          ></img>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full ">
        <img
          className="w-full translate-y-[4px] z-0"
          src="/static/images/tilt-section.svg"
        />
        <div className="w-full h-[100px] md:h-[200px] translate-y-[2px] bg-[#F8B700]"></div>
      </div>
    </div>
  );
};

export default PitchSection;
