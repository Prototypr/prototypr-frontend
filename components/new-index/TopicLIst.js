import React from "react";
import TopicTopItem from './TopicTopItem'
import TopicItem from "./TopicItem"
export default function TopicList({}) {

    return (
        <section className="mt-10 grid lg:grid-cols-2 grid-cols-1 gap-10">
            <TopicTopItem />
            <TopicTopItem />
            <TopicItem />
            <TopicItem />
            <TopicItem />
            <TopicItem />
        </section>
    )
}