import React , { useState, useEffect } from "react";
import dynamic from 'next/dynamic'

// const FeedItem = dynamic(() => import('./FeedItem'), { ssr: false })

export default function Feeds({}) {
    /**Math.random 200~400 */
    const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: `feed-${ind}` }));

    const [list, setList] = useState(getItems);

    const [list1, setList1] = useState([]);
    const [list2, setList2] = useState([]);
    const [list3, setList3] = useState([]);

    useEffect(() => {
        const newList = list.forEach((item, index) => {
            item.height = Math.floor(Math.random() * 200) + 200;
        })
        setList1(list.filter((item, index) => !(index % 3)))
        setList2(list.filter((item, index) => (index % 3 === 1)))
        setList3(list.filter((item, index) => (index % 3 === 2)))
        // setList(newList)
    }, [])

    return (
        <section className="mt-36 pt-3 pb-10">
            <h4 className="text-4xl font-bold  text-title-1 mb-10">Feeds</h4>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-10">
                <div className="grid-cols-1 grid gap-y-10" style={{border:"1px solid blue"}}>
                    {
                        list1.length && list1.map((item, index) => {
                            return (
                                <div className="w-full" key={`col1_${index}`} style={{height:` ${item.height}px`,border:"1px solid red"}}></div>
                            )
                        })
                    }
                </div>

                <div className="grid-cols-1 grid gap-y-10" style={{border:"1px solid blue"}}>
                    {
                        list2.length && list2.map((item, index) => {
                            return (
                                <div className="w-full" key={`col2_${index}`} style={{height:` ${item.height}px`,border:"1px solid red"}}></div>
                            )
                        })
                    }
                </div>

                <div className="grid-cols-1 grid gap-y-10" style={{border:"1px solid blue"}}>
                    {
                        list3.length && list3.map((item, index) => {
                            return (
                                <div className="w-full" key={`col3_${index}`} style={{height:` ${item.height}px`,border:"1px solid red"}}></div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}