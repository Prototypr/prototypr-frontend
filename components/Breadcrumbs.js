
import React , { useState } from "react";
import Link from 'next/link'
import {
  ChevronRightIcon
} from '@radix-ui/react-icons';

export default function Breadcrumbs ({title = "", links = [], currentSlug='', urlRoot='', pageNo=null}) {
    return <>
    <div>
         {links.map((item,index) =>{
            return (
                <div className="inline" key={index}>
                    {" "} 
                    <div className="inline rounded-full p-1.5 px-3 bg-white bg-opacity-50">
                    <Link href={`${item.slug}`} key={`breadcrumb_${title}_${index}`}>
                     {!item.svg?<span className="hover:underline">{item.name}</span>:<>{item.svg}</>}
                     </Link>
                    </div>
                     <div className="inline mx-1"><ChevronRightIcon className="inline"/></div>
                 </div>
            );
         })}
        {currentSlug?
        <div className="inline rounded-full p-1.5 px-3 bg-white bg-opacity-50">
        <Link
            href={`${urlRoot}/${currentSlug}/page/1`}
            // className={`capitalize ${pageNo?'':'text-bold'}`}>
            className={`capitalize font-semibold text-blue-600`}>
            {currentSlug}
        </Link>
        </div>
        :

        <div className="inline p-1.5 px-3 rounded-full bg-white bg-opacity-50">
        <Link href={`${urlRoot}/page/1`}>
            <span className="capitalize text-bold">{title}</span>
        </Link>
        </div>
        }

        {/* {pageNo?
        <>
        <div className="inline mx-1"><ChevronRightIcon className="inline"/></div>

        <div className="inline rounded-full p-1.5 px-3 bg-white bg-opacity-70 border">
        <span
            className="text-blue-600 font-medium capitalize">
            Page {pageNo}
        </span>
        </div>
        </>
        :''} */}
        
    </div>
    {/* <h1 className="text-4xl text-center font-bold tracking-tighter leading-tight mb-2">{title}</h1> */}

    </>;
}

