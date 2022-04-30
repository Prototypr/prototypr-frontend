import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const Tabs = dynamic(() => import("./Tabs"), { ssr: false });
const TopicList = dynamic(() => import("./TopicList"), { ssr: false });

import { useIntl } from 'react-intl';
export default function TopicSpolights({ tabs = [], topics = {} }) {
  const intl = useIntl();

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
    <section className="mt-16 md:mt-24 pt-3 pb-10 px-3 xl:px-0">
      <h4 className="text-3xl font-bold text-gray-900 text-title-1">
        {intl.formatMessage({ id: "topicSpotlight.title"})}
      </h4>
      {/**tabs */}
      <Tabs items={tabs} onTabChanged={(item) => onTabChanged(item)} />
      <TopicList currentTopics={currentTopic} />
    </section>
  );
}
