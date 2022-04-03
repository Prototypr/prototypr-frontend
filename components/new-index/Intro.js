export default function Intro() {
  return (
    <aside className="px-5 py-10 sm:p-12 bg-gray-100 sm:p-16 mb-8">
      <div className="max-w-xl mx-auto text-center">
        {/* <p className="text-sm font-medium text-gray-900">
          Open source, inclusive, and no paywall.
        </p> */}

        <p className="text-3xl sm:text-5xl md:text-6.5xl text-black leading-tight text-title-1 font-bold tracking-wide mt-2">
          {/* That design publication, with the awesome articles */}
          <span className="block sm:inline">
            Top design articles, tools, and{" "}
          </span>
          <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">
            shiny pixels.
          </span>
        </p>

        <form className="mt-5 md:mt-8 sm:flex w-10/12 mx-auto">
          <div className="sm:flex-1">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              placeholder="Email address"
              className="border-transparent border-solid border-2 border-gradient-br-blue-darkblue-gray-50 hover:border-gradient-tl-blue-darkblue-gray-50 gradient-border-3 w-full h-full p-3 text-gray-800 bg-white rounded-xl"
            />
          </div>
          <button
            type="submit"
            className="flex justify-center md:text-left items-center md:justify-between w-full px-5 py-3 mt-4 font-medium text-white bg-blue-800 rounded-xl sm:w-auto sm:mt-0 sm:ml-3 hover:bg-blue-700"
          >
            Get Updates
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="flex-shrink-0 w-4 h-4 ml-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </form>

        {/* 
        <div className="mt-7 mx-auto relative h-12 w-9/12 border border-1 rounded-lg">
          <input
            placeholder="Enter your email"
            style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.02)" }}
            className="bg-white rounded-lg w-full h-full p-3 focus:outline-none text-base font-medium leading-6 text-neutrals-700 placeholder:text-neutrals-600"
          />
          <button
            style={{ marginTop: "3px", marginRight: "3px" }}
            className="absolute top-0 right-0 h-10 z-20 bg-blue-1 rounded-lg text-white text-base font-medium leading-6 flex items-center justify-center py-2 px-3 hover:opacity-70"
          >
            Subscribe
          </button>
        </div>
        */}
        <p className="text-xs font-medium mt-5 text-gray-900">
          Open source. Free to all. No paywall.
          <div className="sm:hidden pt-2"></div> 💙{" "}
          <a className="underline">Learn about Prototypr</a>.
        </p>
      </div>
    </aside>
  );
}
