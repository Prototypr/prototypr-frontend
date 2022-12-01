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

export default FooterCTA;
