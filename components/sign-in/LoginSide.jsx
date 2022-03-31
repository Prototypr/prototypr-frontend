const LoginSide = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={`/static/images/logo-small.svg`} alt="" />
      <h1 className="text-3xl font-semibold mt-2">Join Prototypr</h1>
      <p className="text-sm text-gray-400 mt-4 mb-5">
        Be part of the next generation of web publishing.
      </p>
      <div className="text-sm font-light text-gray-200">
        <p>
          <span>👉</span> Increase your audience
        </p>
        <p>
          <span>👉</span> Dive into the design universe
        </p>
        <p>
          <span>👉</span> Earn rewards for reading + contributing
        </p>
      </div>
    </div>
  );
};

export default LoginSide;
