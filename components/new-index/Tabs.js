import React, { useState } from "react";
import { useIntl, FormattedMessage } from "react-intl";
export default function Tabs({ items = [], onTabChanged = () => {} }) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const intl = useIntl();
  return (
    <div className="flex border-b-gray-5 w-full mt-10 tab relative">
      {/**tab item */}
      {items.length
        ? items.map((item, index) => {
            return (
              <div
                key={`tab_${index}`}
                className={`text-gray-1 text-xs sm:text-sm md:text-2xl pb-1 md:pb-3 leading-8  relative mr-6 cursor-pointer tab-item
                            ${
                              index === currentTabIndex
                                ? " tab-item-active font-bold"
                                : " font-normal"
                            }`}
                onClick={() => {
                  setCurrentTabIndex(index);
                  onTabChanged(item.slug);
                }}
              >
                {intl.formatMessage({ id: item.name })}
              </div>
            );
          })
        : null}
    </div>
  );
}
