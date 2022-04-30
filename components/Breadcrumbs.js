
import React , { useState } from "react";
import Link from 'next/link'


export default function Breadcrumbs ({title = "", links = [], currentSlug='', urlRoot=''}) {
    return (
        <>
        <h1 className="font-semibold text-3xl">{title}</h1>
        <div className="pt-2 text-md text-gray-700 pb-8">
             {links.map((item,index) =>{
                return( <div className="inline" key={index}>
                    {" "} 
                    <Link href={`${item.slug}`} key={`breadcrumb_${title}_${index}`}>
                     <a className="hover:underline">{item.name}</a>
                     </Link>{" "}→{" "}
                 </div>)
             })}
            {currentSlug?<Link href={`${urlRoot}/${currentSlug}/page/1`}>
                <a className="capitalize underline">{currentSlug}</a>
            </Link>:
            <Link href={`${urlRoot}/page/1`}>
                <a className="capitalize underline">{title}</a>
            </Link>
            }
        </div>
        </>
    )
}

