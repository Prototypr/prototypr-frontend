import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full h-auto fixed top-0 pointer-events-none z-[100] px-4">
      <div className="w-full max-w-6xl mx-auto h-auto mt-10 pointer-events-auto cursor-pointer">
        <div className="w-full h-full p-6 bg-white rounded-[12px] border border-black border-opacity-5 ">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link href="/" as="/">
              <div
                className={`${
                  true ? "opacity-1" : "md:opacity-0 md:mt-16 md:-z-1"
                } flex-shrink-0 flex items-center cursor-pointer transition-all duration-300 ease-in-out`}
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
              } my-auto  transition-all duration-300 ease-in-out`}
            >
              {/* <WMCounter /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
