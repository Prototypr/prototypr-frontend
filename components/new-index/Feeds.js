import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useIntl } from 'react-intl';
const FeedItem = dynamic(() => import("./FeedItem"), { ssr: false });

export default function Feeds({ posts = [] }) {
  const intl = useIntl();
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
    });
    setList1(list.filter((item, index) => !(index % 3)));
    setList2(list.filter((item, index) => index % 3 === 1));
    setList3(list.filter((item, index) => index % 3 === 2));
    // setList(newList)
  }, []);

  return (
    <section className="mt-16 md:mt-36 pt-3 pb-10 px-3 xl:px-0">
      <h4 className="text-3xl text-gray-900 font-bold  text-title-1 mb-10">
        {intl.formatMessage({ id: "moretoppicks.title"})}
      </h4>
      {/* https://tailwindcss.com/docs/columns */}
      <div className="w-full lg:columns-3 sm:columns-2 gap-12">
        {posts.length
          ? posts.map((item, index) => {
              return (
                <FeedItem
                  post={item?.attributes}
                  index={index}
                  key={`col1_${index}`}
                />
              );
            })
          : null}
      </div>

      <div className="mt-10 flex items-center justify-center">
        <button className="font-semibold text-base leading-6 blue-1 h-12 w-52 border-2 border-solid border-blue-1 text-blue-1 rounded-lg hover:opacity-50">
          {intl.formatMessage({ id: "moretopicks.button"})}
        </button>
      </div>
    </section>
  );
}
