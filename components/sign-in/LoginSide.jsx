const LoginSide = ({ user }) => {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden relative">
      <div className="px-10 pt-20 flex flex-col gap-2">
        <a href="/">
          <div className="w-16 h-16 p-4 bg-white rounded-2xl">
            <img
              src={`/static/images/logo-small.svg`}
              data-gumlet="false"
              alt="Prototypr Logo"
            />
          </div>
        </a>
        <h1 className="text-5xl text-white font-bold font-inter">
          Be part of the next generation of Web Publishing.
        </h1>
      </div>
      <div className="translate-y-[200px] scale-[1.5]">
        <img
          className=" rotate-[-20deg]"
          src={`/static/images/signup-publishing-showcase.png`}
        ></img>
      </div>
    </div>
  );
};

export default LoginSide;
