const FeaturesContent = () => {
  return (
    <div className="w-full px-0 md:px-5 bg-transparent">
      <div className="p-5 md:p-10 bg-white  rounded-none md:rounded-3xl mb-20 max-w-7xl mx-auto shadow-sm">
        <div className="flex flex-col lg:flex-nowrap lg:flex lg:flex-row md:flex md:flex-wrap md:flex-col gap-5 py-2 ">
          <div className="transition ease-in-out w-full  p-4 text-center rounded-lg ">
            <img className="mx-auto w-14 h-14 object-contain mb-3" src="/static/icons/pencilchat.png"/>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Get draft feedback</h2>
            <p className="text-gray-700 w-[240px] mx-auto">Give and receive feedback on ideas and get guidance from editors.</p>
          </div>
          <div className="transition ease-in-out w-full  p-4 text-center rounded-lg ">
            <img className="mx-auto w-14 h-14 object-contain mb-3" src="/static/icons/magazine.png"/>
            <h2 className="text-lg font-semibold w-[260px] mx-auto text-gray-900 mb-2">Write for meaning</h2>
            <p className="text-gray-700 w-[240px] mx-auto">Publish to an avid readership, and get discovered for writing meaningful articles.</p>
          </div>
          <div className="transition ease-in-out w-full  p-4 text-center rounded-lg ">
            <img className="mx-auto w-14 h-14 object-contain mb-3" src="/static/icons/heart.png"/>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Contribute to Open Source</h2>
            <p className="text-gray-700 w-[240px] mx-auto">Shape the platform you're writing on through design and code contributions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesContent;
