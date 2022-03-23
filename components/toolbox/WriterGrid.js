import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Image from 'next/image'
import data from './writer.json';
const COUNT = 30;
const COL_SPAN = 2;
const SIZE = "xs";
export default function WriterGrid({count = 0, span = 0 ,size, cols = 4, buttonText = ""}) {

    const [myColSpan, setMyColSpan] = useState(COL_SPAN);
    const [mySize, setMySize] = useState(SIZE);
    const [myCount,setMyCount] = useState(COUNT);
    const [items, setItems] = useState([]);


    const shuffle = (sourceArray) => {
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));
    
            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    }

    useEffect(() => { 
        let items = shuffle(data.people)
        let newCount =  count > 0 ? count: 30;
        let newColSpan = span > 0 ? span: 2;
        let newSize = size ? size: "xs";

        items = items.slice(0,newCount)
        setItems(items)
        setMySize(mySize)
        setMyCount(myCount)
        setMyColSpan(myColSpan)
     }, []);

    return (
        <div className="mx-auto">
            <div className={`grid lg:grid-cols-${cols ? cols: "4"} grid-cols-${cols ? cols: "4"} gap-4 mx-auto`}>
                {
                    items.map((item, index) => {
                        if (size) {
                            if (index < size + 1) {
                                return (
                                    <div key={index} className="mx-auto my-auto">
                                        <Image 
                                            width="48px"
                                            height="48px"
                                            // data-gumlet={false}
                                            src={item.avatar}
                                            className="rounded-full" 
                                            alt="Writer profile picture"/>
                                    </div>
                                )
                            }
                        } else {
                            return (
                                <div key={index} className="mx-auto my-auto">
                                    <Image 
                                        width="48px"
                                        priority={false}
                                        height="48px"
                                        src={item.avatar}
                                        // dataGumlet="false" 
                                        className="bg-white rounded-full" 
                                        alt="Writer profile picture"/>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div  className="borderRadius-l" style={{marginTop:'-5px'}} >
                <Link href="/new-story" as="/new-story">
                    <button aria-label={buttonText} size="small" hover="secondary">{buttonText}</button>
                </Link>
            </div>
        </div>
    )
}