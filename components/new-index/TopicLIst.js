import React from "react";
import TopicTopItem from './TopicTopItem'
import TopicItem from "./TopicItem"
export default function TopicList({currentTopic = []}) {

    return (
        <section className="mt-10 grid lg:grid-cols-2 grid-cols-1 gap-10">
            {
                currentTopic.length ? currentTopic.map((item, index) => {
                    return <TopicTopItem key={`topic_${index}`} topic={item?.attributes} />
                }): null
            }
            {/* <TopicItem />
            <TopicItem />
            <TopicItem />
            <TopicItem /> */}
        </section>
    )
}