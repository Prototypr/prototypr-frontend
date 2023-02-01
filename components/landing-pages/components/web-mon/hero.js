const Hero = () => {
  return (
    <div className="w-full bg-[#22AA79] h-auto flex flex-row relative px-10">
      <div className="relative max-w-6xl mx-auto w-full h-full z-[2] flex flex-col md:flex-row py-10 md:py-0">
        <div className="w-full flex flex-col pt-32 md:pt-52 py-20 md:py-32">
          <h1 className="mb-4 text-[30px] sm:text-[40px] md:text-[60px] font-inter text-[#113E33] leading-[44px] md:leading-[64px] font-semibold">
          A new way for creators to earn
          </h1>
          <p className="mb-4 text-[#1f322b] text-[18px] leading-[34px] max-w-lg font-medium font-inter">
          With our Web-Monetized platform, you can earn tips and micropayments directly from readers, thanks to payment providers like <span className="font-bold text-black">Coil</span>.
          {/* Micro payments are a new and exciting way to earn money with your website. With web monetization you can offer premium content to your users, as well as set up micro payment systems. When your website visitors use these payment methods, they aren't charged any extra fees. This is great if you want to offer subscriptions or premium content on demand. */}
            {/* Web Monetization provides an open, native, efficient, and automatic way to compensate creators 
            through payment providers like <span className="font-bold text-black">Coil</span>. Finally, an alternative to intrusive ads. */}
          </p>
          <div className="my-4">
            <a
              href="https://coil.com/about?ref=prototypr.io"
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

export default Hero;
