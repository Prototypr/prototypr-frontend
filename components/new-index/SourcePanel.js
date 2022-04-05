import React, { useState } from "react";
import Image from "next/image";

export default function SourcePanel({}) {
  return (
    <section className="w-full mb-4 px-3 xl:px-0">
      <div className="bg-white relative w-full h-auto md:h-100 flex flex-col md:flex-row relative">
        <figure className="relative h-56 md:absolute left-0 relative w-full md:h-full mb-3 sm:mb-0 mr-6 lg:mr-0 overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full md:w-2/3 h-full ml-8 sm:ml-0 md:ml-8 object-cover rounded-lg transform group-hover:scale-105 transition duration-700 ease-out">
            <Image
              objectFit="contain"
              className="rounded-lg contrast-115"
              layout="fill"
              src={"/static/images/source-bg.png"}
            />
          </div>
        </figure>
        <div className="w-full relative md:absolute md:w-1/2 right-0">
          <div
            className="px-8 pb-8  md:px-0 md:absolute top-16 md:top-20 z-30 left-0 md:-ml-24 md:pr-12 lg:pr-0"
            style={{ maxWidth: "540px" }}
          >
            <h3 className="font-semibold text-5xl md:text-s6xl text-gray-1">
              The Source
            </h3>
            <p className="font-base text-lg leading-normal">
              The Source tackles taboo topics, exposes unseen truths, and gets
              the scoop on the latest in the tech and design sphere.
            </p>
            <div className="mt-7 relative h-16 md:w-10/12">
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
      </div>
    </section>
  );
}
