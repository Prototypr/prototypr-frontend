import React, { useState } from "react";

export default function SourcePanel({}) {
  return (
    <section className="w-full mb-4 px-3 xl:px-0">
      <div className="bg-white relative w-full h-100">
        <div
          className="absolute left-18 top-0 h-full bg-contain w-7/12 bg-no-repeat"
          style={{ backgroundImage: "url(/static/images/source-bg.png)" }}
        ></div>
        <div className="absolute top-20 z-30 w-2/5" style={{ left: "45%" }}>
          <h3 className="font-medium text-s6xl text-gray-1">The Source</h3>
          <p className="font-medium text-lg leading-normal">
            The Source tackles taboo topics, exposes unseen truths, and gets the
            scoop on the latest in the tech and design sphere.
          </p>
          <div className="mt-7 relative h-16 w-10/12">
            <input
              placeholder="Your Email"
              style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.02)" }}
              className="bg-gray-4 rounded-lg w-full h-full p-3 focus:outline-none text-base font-medium leading-6 text-neutrals-700 placeholder:text-neutrals-700"
            />
            <button className="absolute top-3 right-3 h-10 z-20 bg-blue-1 rounded-lg text-white text-base font-medium leading-6 flex items-center justify-center py-2 px-3 hover:opacity-70">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
