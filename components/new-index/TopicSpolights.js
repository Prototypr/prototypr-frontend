import React, { useState, useEffect } from "react";
import Tabs from "./Tabs";
import TopicList from "./TopicList";
import { useIntl } from 'react-intl';
export default function TopicSpolights({ tabs = [], topics = {} }) {
  const intl = useIntl();

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [currentTopic, setCurrentTopic] = useState([]);

  const onTabChanged = (tag) => {
    if (topics[tag]) {
      setCurrentTopic(topics[tag]);
    }
  };

  useEffect(() => {
    if (tabs.length) {
      const tag = tabs[0].slug;
      if (topics[tag]) {
        setCurrentTopic(topics[tag]);
      }
    }
  }, []);

  return (
    <section className="mt-16 md:mt-36 pt-3 pb-10 px-3 xl:px-0">
      <h4 className="text-3xl font-bold text-gray-900 text-title-1">
        {intl.formatMessage({ id: "topicSpotlight.title"})}
      </h4>
      {/**tabs */}
      <Tabs items={tabs} onTabChanged={(item) => onTabChanged(item)} />
      <TopicList currentTopics={currentTopic} />
    </section>
  );
}
