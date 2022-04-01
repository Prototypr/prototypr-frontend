import React , { useState, useEffect } from "react";
import Tabs from "./Tabs";
import TopicList from "./TopicLIst";

export default function TopicSpolights({tabs = [], topics = {}}) {

    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [currentTopic, setCurrentTopic] = useState([])

    const onTabChanged = (tag) => {
        if (topics[tag]) {
            setCurrentTopic(topics[tag])
        }
    }

    useEffect(() => {
        if (tabs.length) {
            const tag = tabs[0].name
            if (topics[tag]) {
                setCurrentTopic(topics[tag])
            }
        }
    }, [])

    return (
        <section className="mt-36 pt-3 pb-10">
            <h4 className="text-4xl font-bold  text-title-1">Topic Spolights</h4>
            {/**tabs */}
            <Tabs 
                
                items={tabs}
                onTabChanged={(item) => onTabChanged(item)}
            />
            <TopicList 
                currentTopic={currentTopic}
            />
        </section>
    )
}