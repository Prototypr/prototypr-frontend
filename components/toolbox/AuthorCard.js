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
            <div className="mb-6 md:mb-0 bg-white border-gray-300 p-5 block md:block rounded-lg">
                <a>
                    <h1 tabIndex={0} className="text-sm font-semibold mb-3">{attributes.title ? attributes.title : "Posted by"}</h1>
                    <div className="py-2 w-full relative flex">
                        <div className="relative mr-3">
                            {/* <img 
                                width="48px"
                                height="48px"
                                src={attributes?.avatar}
                                className="border border-3 border-gray-400 cursor-pointer rounded-lg mr-3 flex-shrink-0" 
                                alt="Author profile picture"
                            /> */}
                            <div className="w-12 h-12 rounded-full border border-1 overflow-hidden relative border-gray-100 shadow-sm">
                                <Image 
                                tabIndex={0}
                                layout="fill"
                                objectFit="cover"
                                src={attributes?.avatar}
                                className="rounded-full " 
                                alt="Author profile picture"/>
                            </div>
                        </div>

                        <div className="my-auto">
                            <p tabIndex={0} className="text-sm cursor-pointer leading-5 font-semibold text-gray-800">{attributes.firstName} {attributes.lastName}</p>
                            <p tabIndex={0} className="text-sm">Editor</p>
                            {/* <div className="flex">
                                <p className="text-sm leading-5 text-gray-700">
                                Social Media and Partnerships Management at Prototypr.io
                                </p>
                            </div> */}
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
}