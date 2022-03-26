import React , { useState } from "react";
import Tabs from "./Tabs";
import TopicList from "./TopicLIst";
const TAB_ITEMS = [{
    slug: '',
    name: 'AR/VR'
},{
    slug: '',
    name: 'Product design'
},{
    slug: '',
    name: 'User interview'
},{
    slug: '',
    name: 'User research'
},{
    slug: '',
    name: 'Coding'
},{
    slug: '',
    name: 'More'
}]
export default function TopicSpolights({}) {

    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const onTabChanged = (item) => {
        alert('you maybe need to resend Query')
    }
    return (
        <section className="mt-36 pt-3 pb-10">
            <h4 className="text-4xl font-bold  text-title-1">Topic Spolights</h4>
            {/**tabs */}
            <Tabs 
                items={TAB_ITEMS}
                onTabChanged={(item) => onTabChanged(item)}
            />
            <TopicList />
        </section>
    )
}