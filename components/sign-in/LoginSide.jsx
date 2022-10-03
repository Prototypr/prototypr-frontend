const LoginSide = ({user}) => {
  return (
    <div className="flex flex-col items-center">
      <a href="/">
      <img src={`/static/images/logo-small.svg`} 
      data-gumlet="false"
      alt="Prototypr Logo" />
      </a>
      <h1 className="text-2xl font-semibold mt-2">{!user?.email?'Join Prototypr':'Publish with us'}</h1>
      <p className="text-sm text-gray-400 mt-4 mb-5">
        Be part of the next generation of web publishing.
      </p>
      <div className="text-sm font-light text-gray-200">
        <p className="mb-1">
          <span>👉 </span> Share your knowledge
        </p>
        <p className="mb-1">
          <span>👉 </span> Build your online presence
        </p>
        <p className="mb-1">
          <span>👉 </span> Earn rewards for contributing
        </p>
      </div>
    </div>
  );
};

export default LoginSide;
