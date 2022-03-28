
import React from "react";
import Image from "next/image";
export default function EditorPick({}) {

    return (
        <section className="pb-10">
            <h3 className="text-4xl text-title-1 font-bold leading-6 tracking-wide mb-9">Editor’s picks</h3>
            <div className="rounded-lg bg-white w-full p-10 flex">
                <div className="flex-1">
                    <Image 
                        width={800}
                        height={430}
                        className="object-cover"
                        alt="img"
                        src={
                            "/static/images/default_pick.png"
                        }
                    />
                </div>
                <div className="w-9/20 ml-10">
                    <div className="flex mb-5">
                        <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3 mr-1">
                            # leadership
                        </div>
                        <div className="font-medium text-sm leading-6 tracking-wide uppercase text-gray-3">
                            # product design
                        </div>
                    </div>
                    <p className="text-2xl font-bold leading-tight text-paragraph-1 w-4/5">
                    Design Leadership: 10 things I learned in the last decade being a product designer
                    </p>
                    <p className="text-base font-medium text-gray-2 leading-normal mt-4">
                    Guiding leadership values for 2022. Excellent leadership skills are hard to find these days. However, I have been in and out working ...
                    </p>
                    <div className="flex mt-6 items-center">
                        <div className="w-11 h-11 rounded-full" style={{border:"1px solid red"}}></div>
                        <div className="font-medium text-base ml-3 text-gray-1">Abram Bator</div>
                    </div>
                </div>
            </div>
        </section>
    )
}