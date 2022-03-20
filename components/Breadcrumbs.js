
import React , { useState } from "react";
import Link from 'next/link'


export default function Breadcrumbs ({title = "", links = [], currentSlug=''}) {
    return (
        <>
        <h1 className="font-semibold text-2xl">{title}</h1>
        <div className="pt-1 text-sm text-gray-700 pb-8">
             {links.map((item,index) =>{
                return( <>
                    {" "} 
                    <Link href={item.slug}>
                     <a>{item.name}</a>
                     </Link>{" "}→{" "}
                 </>)
             })}
            {currentSlug?<Link href={`/toolbox/${currentSlug}/page/1`}>
                <a className="capitalize">{currentSlug}</a>
            </Link>:
            <Link href={`/${title.toLowerCase()}/page/1`}>
                <a className="capitalize">{title}</a>
            </Link>
            }
        </div>
        </>
    )
}

