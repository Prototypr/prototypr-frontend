import React, { useState } from "react";
import Link from 'next/link'
import Image from 'next/image'

export default function AuthorCard({ author = {} }) {
    // console.log('my author is*******' + JSON.stringify(author))
    let attributes = {};
    if (author.data && author.data.attributes) {
        //displayName firstName lastName avatar
        attributes = author.data.attributes
    }
    return (
        <>
            <div className="mb-6 md:mb-0 bg-white border-gray-300 px-2 py-3 block md:block rounded-lg shadow">
                <a>
                    <h1 className="text-sm font-semibold mb-3">{attributes.title ? attributes.title : "Posted by"}</h1>
                    <div className="py-3 w-full relative flex">
                        <div className="relative mr-2 w-12 h-12">
                            <img 
                                width="48px"
                                height="48px"
                                src={attributes?.avatar}
                                className="border border-3 border-gray-400 cursor-pointer rounded-lg mr-3 flex-shrink-0" 
                                alt="Author profile picture"
                            />
                            {/* <Image 
                                width="48px"
                                height="48px"
                                priority={false}
                                data-gumlet={false}
                                src={attributes?.avatar}
                                className="border border-3 border-gray-400 cursor-pointer rounded-lg mr-3 flex-shrink-0" 
                                alt="Author profile picture"/> */}
                        </div>

                        <div>
                            <p className="text-sm cursor-pointer leading-5 font-semibold text-gray-800">{attributes.firstName} {attributes.lastName}</p>
                            <div className="flex">
                                <p className="text-sm leading-5 text-gray-700">
                                Social Media and Partnerships Management at Prototypr.io
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
}